const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Route for fetching order details by ID
router.get('/:orderId', orderController.getOrderById);

// Route for generating bill for an order
router.post('/:orderId/generate-bill', orderController.generateBill);

// Route for updating order status
router.put('/:orderId/update-status', orderController.updateOrderStatus);

module.exports = router;
