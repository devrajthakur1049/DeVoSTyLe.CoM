const express = require('express');
const router = express.Router();

const{protect} = require('../middleware/authMiddleware');  
const {admin} = require('../middleware/adminMiddleware');
const{getAdminstatus} = require('../controllers/analyticsController');


router.get("/", protect, admin, getAdminstatus);


module.exports = router;