const pool = require("../database/db");

const connectService = async (req, res) => {
  try {
    const serviceInfo = await pool.query(
      `INSERT INTO "logger_service" ("logger_username", "servicer_username", "status") VALUES ($1, $2, $3) RETURNING *`,
      [req.body.loggerUsername, req.body.servicerUsername, "Requested"]
    );
    // username of profile the user is viewing

    console.log(serviceInfo.rows);
    res.json({ status: "okay", message: "connection established" });
  } catch (error) {
    console.log("PUT /user/createConnection/:assoc_user", error);
    res.status(400).json({ status: "error", message: error.message });
  }
};

const viewProfile = async (req, res) => {
  try {
    const userDetails = await pool.query(
      `SELECT "username", "user_type", "access_type", "display_name", "profile_picture", "profession", "email", "bio", "overall_rating" FROM "user" WHERE "user_type" != $1 AND "username" = $2`,
      ["Admin", req.params.username]
    );
    // username of profile the user is viewing

    res.json(userDetails.rows);
  } catch (error) {
    console.log("GET /user/viewProfile/:username", error);
    res.status(400).json({ status: "error", message: error.message });
  }
};

const serviceInfo = () => {};

const updateStatus = async (req, res) => {
  try {
    const updatedService = await pool.query(
      `UPDATE "logger_service" SET ("logger_username", "servicer_username", "status", "review_date") = ($1, $2, $3, $4) RETURNING *`,
      [
        hash,
        req.body.logger_username,
        req.body.servicer_username,
        req.body.status,
      ]
    );

    console.log(updatedService.rows);
    res.json({ status: "okay", message: "connection amended" });
  } catch (error) {
    console.log("PUT /user/updatedService/:assoc_user", error);
    res.status(400).json({ status: "error", message: error.message });
  }
};

const discontinueService = () => {};

module.exports = {
  connectService,
  viewProfile, // DONE - not tested
  serviceInfo,
  updateStatus,
  discontinueService,
};
