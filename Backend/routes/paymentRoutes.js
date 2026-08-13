const express = require('express');
const router = express.Router();
const { createdOrder , verifyPayment} = require('../controllers/paymentController');
   


router.post('/order',createdOrder);
router.post('/process', verifyPayment);

module.exports = router;