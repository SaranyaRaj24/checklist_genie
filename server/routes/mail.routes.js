const express = require("express");
const { authentication } = require("../utils/jwt");

const { submitChecklist } = require("../controllers/mail.controllers");

const router = express.Router();

router.use(authentication);


router.post("/submit", submitChecklist);

module.exports = router;
