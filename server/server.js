require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
// const CRUDRouter = require("./router/endpoint");
const user = require("./router/user");

// app.use("/endpoint", CRUDRouter);
app.use("/users", user);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
