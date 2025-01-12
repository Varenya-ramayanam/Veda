const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'dispatched', 'delivered', 'cancelled'],
        default: 'pending'
    },
    quantity: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    paymentMode: {
        type: String,
        enum: ['card', 'cash'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {versionKey: false});

const Order = mongoose.model('Order', OrderSchema);