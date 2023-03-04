const pool = require("../database/db");

const getRecordDate = async (req, res) => {
  try {
    // 1. check if user's record date exists
    const userRecord = await pool.query(
      'SELECT * FROM "record" WHERE "username" = $1 AND "date" = $2',
      [req.decoded.username, req.body.date]
    );
    if (!userRecord.rowCount) {
      // check if rowCount is truthy / !falsy (!0) => username is unique => can continue
      return res
        .status(400)
        .json({ status: "error", message: "record date not found" });
    }

    console.log("record date is: ", userRecord.rows[0]);
    res.json({ status: "okay", message: "record exists" });
  } catch (error) {
    console.log("POST /logger/getRecordDate/", error);
    res.status(400).json({ status: "error", message: "an error has occurred" });
  }
};

const createRecord = async (req, res) => {
  try {
    const createdRecord = await pool.query(
      'INSERT INTO "record" (date, username) VALUES ($1, $2) RETURNING *',
      [req.body.date, req.decoded.username]
    );

    console.log("created user is ", createdRecord.rows[0]);
    res.json({ status: "okay", message: "record created" });
  } catch (error) {
    console.log("PUT /logger/createRecord/", error);
    res.status(400).json({ status: "error", message: "an error has occurred" });
  }
};

const createEntry = async (req, res) => {
  // try {
  //   const createdRecord = await pool.query(
  //     'INSERT INTO "record" (date, username) VALUES ($1, $2) RETURNING *',
  //     [req.body.date, req.decoded.username]
  //   );
  //   console.log("created user is ", createdRecord.rows[0]);
  //   res.json({ status: "okay", message: "record created" });
  // } catch (error) {
  //   console.log("PUT /logger/createRecord/", error);
  //   res.status(400).json({ status: "error", message: "an error has occurred" });
  // }
};

const displayAllRecords = () => {};

const displaySomeRecords = () => {};

const updateRecord = () => {};

const updateEntry = () => {};

const deleteRecord = () => {};

const deleteEntry = () => {};

module.exports = {
  getRecordDate,
  createRecord,
  createEntry,
  displayAllRecords,
  displaySomeRecords,
  updateRecord,
  updateEntry,
  deleteRecord,
  deleteEntry,
};
