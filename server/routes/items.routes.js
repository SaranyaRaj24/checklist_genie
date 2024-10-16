const express = require('express');
const { getAllItems, createItems } = require('../controllers/items.controllers');
const router = express.Router();

router.get('/getItems',getAllItems);
router.post('/createItems',createItems);

module.exports = router;