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



app.get('/',(req,res)=>{
    res.send("Hello world!!")
    })
// app.use("/photo", require("./routers/photoRouter"))
// app.use("/post", require("./routers/postRouter"))
// app.use("/todo", require("./routers/todoRouter"))
// app.use("/user", require("./routers/userRouter"))

// app.get("/getser",(req,res) => {
// res.json("get")
// })

mongoose.connection.once('open', () => {
    console.log(`connected to MongoDB`)
    app.listen(PORT, () => console.log(`The server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)

})
