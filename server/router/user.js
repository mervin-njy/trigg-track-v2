const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  createUser,
  userLogin,
  refreshAccess,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

const {
  connectService,
  viewProfile,
  serviceInfo,
  updateStatus,
  discontinueService,
} = require("../controllers/profile");

const {
  getRecordDate,
  createRecord,
  createEntry,
  displayAllRecords,
  displaySomeRecords,
  updateRecord,
  updateEntry,
  deleteRecord,
  deleteEntry,
} = require("../controllers/record");

const {
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/comment");

const {
  createReview,
  displayAllReviews,
  displaySomeReviews,
  updateReview,
  deleteReview,
} = require("../controllers/review");

// ----- USERS -----
// C
router.put("/create", createUser);
// R
router.post("/login", userLogin);
// R
router.post("/refresh", refreshAccess);
// R -
router.get("/getUsers", auth, getUsers);
// R - search for user
router.post("/getUser", auth, getUser);
// U
router.patch("/updateUser", auth, updateUser);
// D - Admin: any acc, Others: own acc
router.delete("/delete", auth, deleteUser);
// LOGOUT

// ----- logger-service + shared endpoints -----
// C
router.put("/user/createConnection/:assoc_user", auth, connectService);
// R
router.post("/user/viewProfile/:username", auth, viewProfile);
// R
router.post("/user/serviceInfo/:assoc_user", auth, serviceInfo);
// R
router.get("/user/displayAllRecords/:logger", auth, displayAllRecords);
// R
router.post("/user/displaySomeRecords/:logger", auth, displaySomeRecords);
// R
router.get("/user/displayAllReviews/:servicer", auth, displayAllReviews);
// R
router.post("/user/displaySomeReviews/:servicer", auth, displaySomeReviews);
// U
router.patch("/user/updateStatus/:assoc_user", auth, updateStatus);
// D
router.delete("/user/discontinueService/:assoc_user", auth, discontinueService);

// ----- Logger -----
// R
router.post("/logger/getRecordDate", auth, getRecordDate);
// C
router.put("/logger/createRecord", auth, createRecord);
// C
router.put("/logger/createEntry", auth, createEntry);
// C
router.put("/logger/createReview/:servicer", auth, createReview); // + updateRating
// U
router.patch("/logger/updateRecord", auth, updateRecord);
// U
router.patch("/logger/updateEntry", auth, updateEntry);
// U
router.patch("/logger/updateReview", auth, updateReview);
// D
router.delete("/logger/deleteRecord", auth, deleteRecord);
// D
router.delete("/logger/deleteEntry", auth, deleteEntry);
// D
router.delete("/logger/deleteReview", auth, deleteReview);

// ----- Servicer -----
// C
router.put("/servicer/createComment/:logger", auth, createComment);
// U
router.patch("/servicer/updateComment", auth, updateComment);
// D
router.delete("/servicer/deleteComment", auth, deleteComment);

module.exports = router;
