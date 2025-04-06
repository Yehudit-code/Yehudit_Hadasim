const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    pricePerUnit: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 0
    },
    minimumQuantity: {
        type: Number,
        default: 0
    }
})

const supplierSchema = new mongoose.Schema({
    companyName: String,
    phoneNumber: String,
    representativeName: String,
    products: [productSchema],
})

module.exports = mongoose.model('Supplier', supplierSchema);
