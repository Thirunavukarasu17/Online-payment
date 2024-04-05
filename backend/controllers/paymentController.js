const paypalService = require('../services/paypalService');
const Order = require('../models/orderModel');
const Transaction = require('../models/transaction');
const { generateBill } = require('../utilis/billGenerator');
const mongoose = require('mongoose');

async function initiatePayment(req, res) {
    try {
        const { orderId } = req.body;

        if (!mongoose.isValidObjectId(orderId)) {
            return res.status(400).json({ error: 'Invalid order ID' });
        }

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        const totalAmount = calculateTotalAmount(order);

        const bill = generateBill(order);

        const paymentResponse = await paypalService.initiatePayment(totalAmount);

        console.log('Payment Response:', paymentResponse);

        const transaction = new Transaction({
            orderId,
            amount: totalAmount,
            paymentId: paymentResponse.paymentId || null, 
            status: 'pending' 
        });
        await transaction.save();


        // Return approval link and bill details to frontend
        return res.json({ approvalLink: paymentResponse.approvalLink, bill });
    } catch (error) {
        console.error('Error initiating payment:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}



async function paypalWebhook(req, res) {
    try {
       const eventData = req.body;

        await Transaction.findOneAndUpdate(
            { paymentId: eventData.paymentId },
            { status: eventData.status },
            { new: true }
        );

        return res.status(200).send('Webhook event processed successfully');
    } catch (error) {
        console.error('Error processing PayPal webhook:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

function calculateTotalAmount(order) {
    let totalAmount = order.items.reduce((acc, item) => acc + item.price, 0);
    totalAmount += order.deliveryFee + order.containerCharges; 
    return totalAmount;
}

module.exports = {
    initiatePayment,
    paypalWebhook
};
