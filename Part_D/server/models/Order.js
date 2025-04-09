const mongoose = require('mongoose');
const User = require('./User');
const Product = require("../models/Product")

const orderDetailSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'  // ודא שזה מתואם לשם המודל של המוצר (במקרה שלך Product)
    },
    quantity: {
        type: Number,
        required: true,
    },
    productInfo: {  // שמירה של המידע של המוצר יחד עם הכמות
        name: { type: String },
        price: { type: Number }
    }
});

const orderSchema = new mongoose.Schema({
    supplierId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dateOrder: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['ממתין', 'בתהליך', 'הושלמה'],
        default: "ממתין"
    },
    orderDetails: [orderDetailSchema]
})

module.exports = mongoose.model('Order', orderSchema)
