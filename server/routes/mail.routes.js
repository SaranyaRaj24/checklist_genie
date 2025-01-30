const express = require("express");
const { authentication } = require("../utils/jwt");

const {
  submitChecklist,
  addRecipient,
} = require("../controllers/mail.controllers");

const router = express.Router();

router.use(authentication);

router.post("/submit", submitChecklist);
router.post("/add-recipient", addRecipient);

module.exports = router;
