const express = require('express');
const { getLinkedItems } = require('../controllers/linkedItems.controllers');
const router = express.Router();

router.get('/getAll',getLinkedItems)

module.exports = router;