const express = require('express');
const { getUserPosition,createUserPosition, addUserPosition, removeUserPosition } = require('../controllers/userPosition.controllers');
const router = express.Router();


router.post('/insertpositions', addUserPosition);
router.delete('/deleteposition', removeUserPosition);

router.get('/getPosition',getUserPosition)
router.post('/createPosition',createUserPosition)

module.exports = router;