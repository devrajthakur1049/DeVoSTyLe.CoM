const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authmiddleware');
const { admin } = require('../middleware/adminmiddleware');
const { getAdminstatus } = require('../controllers/analyticsController');


router.get("/", protect, admin, getAdminstatus);


module.exports = router;