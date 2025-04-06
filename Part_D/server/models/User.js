const mongoose = require ("mongoose")
const { stringify } = require("querystring")

const userSchema = mongoose.Schema(
    {
        name: {
            type:String,
            required: true
        },
        username:{
            type:String,
            required: true
        },
        email:{
            type:String,
            trim: true,
            lowercase: true
        },
        address:{
            type:String
        },
        phone:{
            type: String,
            required: true
        }

    },{
        timestamp: true
    }
)

module.exports = mongoose.model('User', userSchema)
   
