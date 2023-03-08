const pool = require("../database/db");
const connectService = () => {};

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

const updateStatus = () => {};

const discontinueService = () => {};

module.exports = {
  connectService,
  viewProfile, // DONE - not tested
  serviceInfo,
  updateStatus,
  discontinueService,
};
