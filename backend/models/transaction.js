const mongoose = require('mongoose');

// Define schema for Transaction
const transactionSchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    amount: { type: Number, required: true },
    paymentId: { type: String }, 
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' }
}, { timestamps: true });


const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
