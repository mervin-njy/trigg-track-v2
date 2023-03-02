require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./database/db");
// const CRUDRouter = require("./router/endpoint");
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
// app.use("/endpoint", CRUDRouter);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
