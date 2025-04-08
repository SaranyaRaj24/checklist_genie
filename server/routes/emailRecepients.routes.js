const express = require("express");
const {
  addTemplateRecipients,
  removeTemplateRecipient,
  getTemplateRecipients,
} = require("../controllers/emailRecepients.controllers");
const router = express.Router();

router.get('/getreceipients/:template_id', getTemplateRecipients);

router.post('/:template_id/recipients', addTemplateRecipients);
router.delete('/recipients/:recipient_id', removeTemplateRecipient);

module.exports = router;
