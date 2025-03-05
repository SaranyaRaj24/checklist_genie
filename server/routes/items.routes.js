const express = require('express');
const { authentication } = require('../utils/jwt');

const 
     { 
    getAllItems, 
    createItems,
    getItemsByTemplate,
    addExtraItems,
    
    
    
 }  = require('../controllers/items.controllers');
const router = express.Router();

router.use(authentication);
 
router.get('/getItems',getAllItems);
router.post('/createItems',createItems);
router.get('/getItemsByTemplate/:tag_id/:current_version_id',getItemsByTemplate);
router.post('/addItem/:tag_id/:template_id',addExtraItems);

module.exports = router;