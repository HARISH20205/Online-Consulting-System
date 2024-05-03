const express = require("express");
const router = express.Router();
const consultantsController = require("../controller/consultants");
router.get("/:cid/consultants", consultantsController.getConsultants);
module.exports = router;
