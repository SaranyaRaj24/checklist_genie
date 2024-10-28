const express = require('express');
const { getAllTags, createTags, getAllTagsPosition, getTagsForPosition } = require('../controllers/tags.controllers');
const router = express.Router();

router.get('/getAll',getAllTags)
router.post('/createTags',createTags)
router.get('/getAllTagsPosition',getAllTagsPosition)
router.get('/getTagsPosition',getTagsForPosition)

module.exports = router;