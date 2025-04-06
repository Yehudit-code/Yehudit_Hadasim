const Order = require("../models/Order")

const getAllOrders = async (req, res) => {
    const orders = await Order.find({}, 'dateOrder status').lean()
    if (!orders) {
        return res.status(404).send("no orders!")
    }
    res.json(orders)
}

const getOrderByIDSuppliers = async (req, res) => {
    const { id } = req.params
    const order = await User.find(id).lean()
    if (!order) {
        return res.status(404).send("no order!")
    }
    res.json(order)
}

const createOrders = async (req, res) => {
    const { supplierId, dateOrder, status } = req.body
    if (!supplierId) {
        return res.status(400).send("supplierId is required")
    }
    const order = await Orders.create({ supplierId, dateOrder, status })
    const result = await Order.find()
    res.json({ result })
}

// const updateUser = async (req, res) => {
//     const { id, name, username, email, address, phone } = req.body
//     if (!id || !name || !username || !phone) {
//         return res.status(400).send("id,name,username and phone  is required")
//     }
//     const user = await User.findById(id)
//     user.name = name
//     user.username = username
//     user.email = email
//     user.address = address
//     user.phone = phone
//     const updateUser = await user.save()
//     const result = await User.find()
//     res.json( result)
// }

// const deleteUser = async (req, res) => {
//     const {id} = req.params
//     if (!id)
//         return res.status(400).json("I must id")
//     const user = await User.findById(id)
//     if (!user)
//         return res.status(404).json("not found user")
//     const del = await User.deleteOne(user)
//     const result = await User.find()
//     res.json( result)
// }

module.exports = { getAllOrders, getOrderByIDSuppliers, createOrders }