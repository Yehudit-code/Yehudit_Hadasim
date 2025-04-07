const mongoose = require('mongoose');
const User = require('./User');

const orderSchema = new mongoose.Schema({
    supplierId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    productId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    dateOrder: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['ממתין', 'בתהליך', 'הושלמה'],
        default: "ממתין"
    }
})

module.exports = mongoose.model('Order', orderSchema)
