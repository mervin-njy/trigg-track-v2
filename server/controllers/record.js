const pool = require("../database/db");

const getRecordDate = async (req, res) => {
  try {
    // 1. check if user's record date exists
    const userRecord = await pool.query(
      `SELECT * FROM "record" WHERE "logger_username" = $1 AND "date" = $2`,
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
    // only allow Health loggers
    if (req.decoded.userType !== "Health Logger") {
      res.status(401).json({ status: "error", message: "unauthorised" });
    }

    const createdRecord = await pool.query(
      `INSERT INTO "record" ("date", "logger_username") VALUES ($1, $2) RETURNING *`,
      [req.body.date, req.decoded.username]
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
      'SELECT * FROM "record" WHERE "date" = $1',
      [req.body.date]
    );
    console.log("record id to add entry into:", getDate.rows[0].id);

    // 2. add with retrieved id
    const createdEntry = await pool.query(
      `INSERT INTO "entry" (record_id, type, name, category, title, item, image_url, trigger_tag) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
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
    res.json({ status: "okay", message: "record entry created" });
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
      `SELECT * FROM "entry" JOIN "record" ON entry.record_id = record.id WHERE record.logger_username = $1 AND record.date::text LIKE $2||'%'`,
      [req.body.username, req.body.date]
    );
    console.log(selectedRecord.rows);
    if (!selectedRecord.rowCount) {
      // check if rowCount is truthy / !falsy (!0) => username is unique => can continue
      return res
        .status(400)
        .json({ status: "error", message: "record entries not found" });
    }

    console.log("date entered:", req.body.date);
    console.log("no. of entries: ", selectedRecord.rowCount);
    console.log("entries retrieved: ", selectedRecord.rows);

    // categorize records into date, followed by type (condition/variable), then name & category
    function categorizeRecords(records) {
      return records.reduce((acc, rec) => {
        // 1. deconstruct to get val of each info
        const { date, type, name, category } = rec;

        // 2. create new key if it does not exist yet (for each category)
        if (!acc[date]) {
          acc[date] = {};
        }
        if (!acc[date][type]) {
          acc[date][type] = {};
        }
        if (!acc[date][type][name]) {
          acc[date][type][name] = {};
        }
        if (!acc[date][type][name][category]) {
          acc[date][type][name][category] = [];
        }
        // 3. if category exists, just add to key
        acc[date][type][name][category].push(rec);

        return acc;
      }, {});
    }

    res.json({
      status: "okay",
      message: "entries exist",
      records: categorizeRecords(Object.values(selectedRecord.rows)),
    });
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
  getRecordDate, // DONE
  createRecord, // DONE
  createEntry, // DONE
  getRecordEntriesOnDate, // DONE
  updateRecord,
  updateEntry,
  deleteRecord,
  deleteEntry,
};
