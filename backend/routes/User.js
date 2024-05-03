const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
router.post("/:cid/appointConsult", userController.postAppointConsult);
module.exports = router;
