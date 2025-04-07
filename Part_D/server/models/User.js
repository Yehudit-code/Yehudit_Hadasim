const mongoose = require("mongoose")
const Product = require("./Product")

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        roles: {
            type: String,
            enum: ['supplier', 'owner'],
            default: "supplier",
        },
        companyName: String,
        phoneNumber: String,
        representativeName: String,
        email: {
            type: String,
            trim: true,
            lowercase: true
        },
        address: {
            type: String
        },
        phone: {
            type: String
        },
        products: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }]
    }, {
    timestamp: true
}
)

module.exports = mongoose.model('User', userSchema)

