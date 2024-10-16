const express = require('express');
const { getAllTags, createTags } = require('../controllers/tags.controllers');
const router = express.Router();

router.get('/getTags',getAllTags)
router.post('/createTags',createTags)

module.exports = router;