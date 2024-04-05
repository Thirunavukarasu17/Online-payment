const mongoose = require('mongoose');

// Define schema for Order
const orderSchema = new mongoose.Schema({
    items: [{
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, default: 1 }
    }],
    deliveryFee: { type: Number, default: 0 },
    containerCharges: { type: Number, default: 0 },
    status: { type: String, enum: ['pending', 'processing', 'completed', 'cancelled'], default: 'pending' }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
