const express = require('express');
const { getAllTemplate, createTemplate } = require('../controllers/template.controllers');
const router = express.Router();


router.get('/getTemplate',getAllTemplate);
router.post('/createTemplate',createTemplate);

module.exports = router;