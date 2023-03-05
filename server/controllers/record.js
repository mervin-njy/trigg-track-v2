const pool = require("../database/db");

const getRecordDate = async (req, res) => {
  try {
    // 1. check if user's record date exists
    const userRecord = await pool.query(
      'SELECT * FROM "record" WHERE "logger_username" = $1 AND "year" = $2 AND "month" = $3 AND "day" = $4',
      [req.decoded.username, req.body.year, req.body.month, req.body.day]
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
    // only allow Health loggers
    if (req.decoded.userType !== "Health Logger") {
      res.status(401).json({ status: "error", message: "unauthorised" });
    }

    const createdRecord = await pool.query(
      'INSERT INTO "record" ("logger_username", "year", "month", "day") VALUES ($1, $2, $3, $4) RETURNING *',
      [req.decoded.username, req.body.year, req.body.month, req.body.day]
    );

    console.log("created record is ", createdRecord.rows[0]);
    res.json({ status: "okay", message: "record created" });
  } catch (error) {
    console.log("PUT /logger/createRecord/", error);
    res.status(400).json({ status: "error", message: "an error has occurred" });
  }
};

const createEntry = async (req, res) => {
  try {
    // only allow Health loggers
    if (req.decoded.userType !== "Health Logger") {
      res
        .status(401)
        .json({ status: "error", message: "user type is not Health Logger" });
    }

    // 1. get id of record date
    const getDate = await pool.query(
      'SELECT * FROM "record" WHERE "year" = $1 AND "month" = $2 AND "day" = $3',
      [req.body.year, req.body.month, req.body.day]
    );
    console.log("record id to add entry into:", getDate.rows[0].id);

    // 2. add with retrieved id
    const createdEntry = await pool.query(
      'INSERT INTO "entry" (record_id, type, name, category, title, item, image_url, trigger_tag) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [
        getDate.rows[0].id,
        req.body.type,
        req.body.name,
        req.body.category,
        req.body.title,
        req.body.item,
        req.body.imageUrl,
        req.body.triggerTag,
      ]
    );
    console.log("created entry is ", createdEntry.rows[0]);
    res.json({ status: "okay", message: "record created" });
  } catch (error) {
    console.log("PUT /logger/createEntry/", error);
    res.status(400).json({ status: "error", message: "an error has occurred" });
  }
};

const getRecordEntriesOnDate = async (req, res) => {
  // TODO: combine comments
  try {
    // 1. check if user's record date exists
    const selectedRecord = await pool.query(
      'SELECT * FROM "entry" JOIN "record" ON entry.record_id = record.id WHERE record.logger_username = $1 AND record.year = $2 AND "month" = $3 AND "day" = $4',
      [req.body.username, req.body.year, req.body.month, req.body.day]
    );
    console.log(selectedRecord.rows);
    if (!selectedRecord.rowCount) {
      // check if rowCount is truthy / !falsy (!0) => username is unique => can continue
      return res
        .status(400)
        .json({ status: "error", message: "record entries not found" });
    }

    console.log("entries retrieved: ", selectedRecord.rows);
    res.json({ status: "okay", message: "entries exist" });
  } catch (error) {
    console.log("POST /user/getRecordEntries/", error);
    res.status(400).json({ status: "error", message: "an error has occurred" });
  }
};

const updateRecord = () => {};

const updateEntry = () => {};

const deleteRecord = () => {};

const deleteEntry = () => {};

module.exports = {
  getRecordDate,
  createRecord,
  createEntry,
  getRecordEntriesOnDate,
  updateRecord,
  updateEntry,
  deleteRecord,
  deleteEntry,
};
