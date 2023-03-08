const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  createUser, // DONE
  loginUser, // DONE
  refreshAccess, // DONE
  getUsers, // DONE
  getUser,
  updateUser, // DONE
  deleteUser, // DONE
} = require("../controllers/user");

const {
  connectService,
  viewProfile, // DONE - not tested
  serviceInfo,
  updateStatus,
  discontinueService,
} = require("../controllers/profile");

const {
  getRecordDate, // DONE
  createRecord, // DONE
  createEntry, // DONE
  getRecordEntriesOnDate, // DONE
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
router.put("/createUser", createUser); // DONE
// R
router.post("/loginUser", loginUser); // DONE
// R
router.post("/refresh", refreshAccess); // DONE
// R -
router.get("/getUsers", auth, getUsers); // DONE
// R - search for user
router.post("/getUser", auth, getUser); // NEXT
// U
router.patch("/updateUser", auth, updateUser); // DONE
// D - Admin: any acc, Others: own acc
router.delete("/deleteUser", auth, deleteUser); // DONE
// LOGOUT

// ----- logger-service + shared endpoints -----
// C
router.put("/user/createConnection/:assoc_user", auth, connectService);
// R
router.post("/user/viewProfile/:username", auth, viewProfile); // DONE
// R
router.post("/user/serviceInfo/:assoc_user", auth, serviceInfo);
// R
router.post("/user/getRecordEntries", auth, getRecordEntriesOnDate); // DONE
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
router.post("/logger/getRecordDate", auth, getRecordDate); // DONE
// C
router.put("/logger/createRecord", auth, createRecord); // DONE
// C
router.put("/logger/createEntry", auth, createEntry); // DONE
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
