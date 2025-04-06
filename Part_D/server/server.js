require("dotenv").config()
const express = require("express")
const cors = require("cors")
const corsOptions = require("./config/corsOptions")
const connectDB = require("./config/dbConn")
const { default: mongoose } = require("mongoose")

const app = express()
const PORT = process.env.PORT || 5555
connectDB()

app.use(express.json())
app.use(express.static("public"))
app.use(cors())

app.get('/', (req, res) => {
    res.send("Hello world!!")
})

app.use('/api/suppliers', require('./routers/supplierRouter'));
app.use('/api/orders', require('./routers/orderRouter'));

mongoose.connection.once('open', () => {
    console.log(`connected to MongoDB`)
    app.listen(PORT, () => console.log(`The server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)

})
