const express = require('express');
const { authentication } = require('../utils/jwt');

const { getAllTemplate, createTemplate,
    getTemplatesByTags
 } = require('../controllers/template.controllers');
const router = express.Router();

router.use(authentication);


router.get('/getTemplate',getAllTemplate);
router.post('/createTemplate',createTemplate);

router.get('/getTemplatesByTags',getTemplatesByTags);

module.exports = router;