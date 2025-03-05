const express = require('express');
const {  getItemResponses, updateItemResponse,getChecklistHistory } = require('../controllers/itemResponse.controllers');
const router = express.Router();

router.get('/getResponse',getItemResponses );
router.post('/createResponse',updateItemResponse);

//Method : GET
//Purpose : Getting the Checklist Response for the User to view their checklist reponse which and all users submitted like History
router.post('/getChecklistHistory',getChecklistHistory );

module.exports = router; 