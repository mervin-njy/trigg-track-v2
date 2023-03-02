const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  createUser,
  userLogin,
  refreshAccess,
  getUsers,
  getUser,
  deleteUser,
} = require("../controllers/user");

const {
  createAppointment,
  displayAllAppointments,
  displayFilteredAppointments,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointment");

// ----- USERS -----
// C
router.put("/create", createUser);
// R
router.post("/login", userLogin);
// R
router.post("/refresh", refreshAccess);
// R -
router.get("/users", auth, getUsers);
// R -
router.post("/user", auth, getUser);
// D
router.delete("/delete", auth, deleteUser);
// LOGOUT

// ----- Logger -----
// C
router.put("/logger/addServicer", auth, addServicer);
// C
router.put("/logger/logEntry", auth, createEntry);
// C
router.put("/logger/createReview", auth, createReview);
// R
router.get("/logger/displayAllRecords/:username", displayAllRecords);
// R
router.post("/logger/displayFilteredRecords", auth, displayFilteredRecords);
// Add displayByFilters
// U
router.patch("/logger/updateEntry", auth, updateEntry);
// D
router.delete("/logger/deleteEntry", auth, deleteEntry);
// D
router.delete("/logger/deleteRecord", auth, deleteRecord);
// D
router.delete("/logger/deleteReview", auth, deleteReview);
// D
router.delete("/logger/deleteServicer", auth, deleteServicer);

// ----- Servicer -----
// C
router.put("/user/createComment", auth, createAppointment);
// R
router.get("/user/displayAllAppts/:username", displayAllAppointments);
// R
router.post("/user/displayFilteredAppts", auth, displayFilteredAppointments);
// Add displayByFilters
// U
router.patch("/user/updateAppt", auth, updateAppointment);
// D
router.delete("/user/deleteAppt", auth, deleteAppointment);

module.exports = router;
