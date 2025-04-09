const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    supplierId:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    pricePerUnit: {
        type: Number,
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

module.exports = mongoose.model('Product', productSchema)