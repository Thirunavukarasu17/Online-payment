const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Route for initiating payment
router.post('/pay', paymentController.initiatePayment);

// Route for handling PayPal webhook events
router.post('/webhook/paypal', paymentController.paypalWebhook);

module.exports = router;
