const Order = require('../models/orderModel');
const { generateBill: generateOrderBill } = require('../utilis/billGenerator');

async function getOrderById(req, res) {
    try {
        const orderId = req.params.orderId;

const order = await Order.findOne({ orderId: orderId });
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        return res.json(order);
    } catch (error) {
        console.error('Error fetching order details:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function generateBill(req, res) {
    try {
        const orderId = req.params.orderId;

        const order = await Order.findOne({ orderId: orderId });
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        const bill = generateOrderBill(order);

        return res.json(bill);
    } catch (error) {
        console.error('Error generating bill:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function updateOrderStatus(req, res) {
    try {
        const orderId = req.params.orderId;
        const { status } = req.body;

        const updatedOrder = await Order.findOneAndUpdate({ orderId: orderId }, { status }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        return res.json(updatedOrder);
    } catch (error) {
        console.error('Error updating order status:', error);
        return res.status(500).json({ error: 'Internal servers error' });
    }
}

module.exports = {
    getOrderById,
    generateBill,
    updateOrderStatus
};
