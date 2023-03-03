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
      return res
        .status(400)
        .json({ status: "error", message: "not authorised" });
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
    console.log(response);
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
      accessType: decoded.access_type,
      userType: decoded.user_type,
    };

    const access = jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: payload.id,
    });

    const response = { access };
    console.log(response);
    res.json(response);
  } catch (error) {
    console.log("POST /users/refresh", error);
    res.status(401).json({ status: "error", message: "unauthorised" });
  }
};

const getUsers = async (req, res) => {
  try {
    const decoded = jwt.verify(req.body.access, process.env.ACCESS_SECRET);
    console.log(decoded.userType);

    const users = await pool.query('SELECT * FROM "user"');
    res.json(users.rows);
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

const deleteUser = async (req, res) => {
  //   try {
  //     await User.deleteOne({ username: req.body.username });
  //     res.json({ status: "okay", message: "user deleted" });
  //   } catch (error) {
  //     console.log("DEL /users/delete", error);
  //     res.status(400).json({ status: "error", message: "an error has occurred" });
  //   }
};

module.exports = {
  createUser,
  userLogin,
  refreshAccess,
  getUsers,
  getUser,
  deleteUser,
};
