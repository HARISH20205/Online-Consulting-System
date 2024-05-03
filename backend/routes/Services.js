const express = require("express");
const router = express.Router();
const serviceController = require("../controller/services");
router.get("/getServices", serviceController.getServices);
module.exports = router;
