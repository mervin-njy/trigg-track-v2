const jwt = require("jsonwebtoken");
// const { v4: uuidv4 } = require("uuid");
// destructuring - rename v4 key as uuidv4 so it wont be generic
const bcrypt = require("bcrypt");
const pool = require("../database/db");

const createUser = async (req, res) => {
  try {
    const user = await pool.query(
      'SELECT * FROM "user" WHERE "username" = $1',
      [req.body.username]
    );
    if (user.rowCount) {
      // check if rowCount is truthy / !falsy (!0) => username is unique => can continue
      return res
        .status(400)
        .json({ status: "error", message: "duplicate username" });
    }

    const hash = await bcrypt.hash(req.body.password, 12);
    const createdUser = await pool.query(
      'INSERT INTO "user" (username, hash, user_type, access_type, display_name, profile_picture, profession, email, bio) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [
        req.body.username,
        hash,
        req.body.userType,
        req.body.accessType,
        req.body.displayName,
        req.body.profilePicture,
        req.body.profession,
        req.body.email,
        req.body.bio,
      ]
    );

    console.log("created user is ", createdUser.rows[0]);
    res.json({ status: "okay", message: "user created" });
  } catch (error) {
    console.log("PUT /users/create/", error);
    res.status(400).json({ status: "error", message: "an error has occurred" });
  }
};

const userLogin = async (req, res) => {
  try {
    const user = await pool.query(
      'SELECT * FROM "user" WHERE "username" = $1',
      [req.body.username]
    );
    if (!user.rowCount) {
      // check if rowCount is !truthy / falsy (0) => username does not exist (but don't expose exact error) => can continue
      return res.status(400).json({ status: "error", message: "login failed" });
    }

    const result = await bcrypt.compare(req.body.password, user.rows[0].hash);
    if (!result) {
      return res.status(401).json({ status: "error", message: "login failed" });
    }

    const payload = {
      id: user.rows[0].id,
      username: user.rows[0].username,
      email: user.rows[0].email,
      accessType: user.rows[0].access_type,
      userType: user.rows[0].user_type,
    };

    const access = jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: payload.id,
    });

    const refresh = jwt.sign(payload, process.env.REFRESH_SECRET, {
      expiresIn: "30D",
      jwtid: payload.id,
    });

    const response = { access, refresh };
    console.log("tokens:", response);
    console.log("user:", user.rows[0]);
    res.json(response);
  } catch (error) {
    console.log("POST /users/login", error);
    res.status(400).json({ status: "error", message: "login failed" });
  }
};

// remove /logout

const refreshAccess = (req, res) => {
  //   // no auth => access token already expired => no point authenticating
  try {
    const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);

    const payload = {
      id: decoded.id,
      username: decoded.username,
      email: decoded.email,
      accessType: decoded.accessType,
      userType: decoded.userType,
    };

    const access = jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: payload.id,
    });

    const response = { access };
    console.log(response);
    res.json(response);
  } catch (error) {
    console.log("POST /users/refreshAccess", error);
    res.status(401).json({ status: "error", message: "unauthorised" });
  }
};

// TODO: restrict info each user can get
// FIX WHERE condition = ___ => "col_value" does not exist
const getUsers = async (req, res) => {
  try {
    console.log("Decoded payload:", req.decoded);
    // auth users: all userTypes => as long as login is successful, can view all users
    console.log(req.decoded.userType);

    if (req.decoded.userType === "Admin") {
      const users = await pool.query('SELECT * FROM "user"');

      res.json(users.rows);
    } else {
      // don't show admin
      const users = await pool.query(
        'SELECT * FROM "user" WHERE "user_type" IS NOT NULL' // "user_type" != "Admin"
      );
      // "username", "user_type", "access_type", "display_name", "profile_picture", "profession", "email", "bio", "overall_rating"
      res.json(users.rows);
    }
  } catch (error) {
    console.log("GET /users/getUsers", error);
    res.status(400).json({ status: "error", message: error.message });
  }
};

const getUser = async (req, res) => {
  //   try {
  //     const user = await User.findOne({ username: req.body.username }).select(
  //       "username"
  //     );
  //     if (!user) {
  //       console.log("user not found");
  //       return res.json({ status: "error", message: "user not found" });
  //     }
  //     res.json(user);
  //   } catch (error) {
  //     console.log("POST /users/user", error);
  //     res.status(400).json({ status: "error", message: "an error has occurred" });
  //   }
};

const updateUser = async (req, res) => {
  try {
    // 1. rehash given password
    const hash = await bcrypt.hash(req.body.password, 12);

    // 2. pass all other info (whether changed or not) EXCEPT for username
    const updatedUser = await pool.query(
      'UPDATE "user" SET (hash, user_type, access_type, display_name, profile_picture, profession, email, bio) = ($1, $2, $3, $4, $5, $6, $7, $8) WHERE id = $9 RETURNING *',
      [
        hash,
        req.body.userType,
        req.body.accessType,
        req.body.displayName,
        req.body.profilePicture,
        req.body.profession,
        req.body.email,
        req.body.bio,
        req.decoded.id,
      ]
    );

    console.log("updated user:", updatedUser.rows);
    res.json({ status: "okay", message: "user profile has been updated" });
  } catch (error) {
    console.log("PATCH /users/updateUser", error);
    res.status(400).json({ status: "error", message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    console.log("Decoded payload:", req.decoded);
    // auth users: all userTypes

    if (req.decoded.userType === "Admin") {
      // Admin => can delete any account

      await pool.query('DELETE FROM "user" WHERE username = $1', [
        req.body.username,
      ]);

      console.log("Admin has deleted the following user:", req.body.username);
      res.json({
        status: "okay",
        message: `admin deleted user: ${req.body.username}`,
      });
    } else {
      // Others => as long as login is successful, can delete own account

      await pool.query('DELETE FROM "user" WHERE id = $1', [req.decoded.id]);

      console.log("Logged in user has been deleted.");
      res.json({ status: "okay", message: "user deleted" });
    }
  } catch (error) {
    console.log("DEL /users/delete", error);
    res.status(400).json({ status: "error", message: "an error has occurred" });
  }
};

module.exports = {
  createUser,
  userLogin,
  refreshAccess,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
