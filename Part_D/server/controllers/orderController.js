const Order = require("../models/Order")
const User = require("../models/User")

const getAllOrders = async (req, res) => {
    console.log("aaa");
    const orders = await Order.find({}, ' supplierId dateOrder status productId').populate('productId', 'name quantity').lean()
    if (!orders) {
        return res.status(404).send("no orders!")
    }
    res.json(orders)
}

const getOrderByIDSuppliers = async (req, res) => {
    const { id } = req.params
    const orders = await User.find({ supplierId: id }, 'dateOrder status productId')
        .populate('name', 'quantity').lean()
    if (!orders) {
        return res.status(404).send("no orders!")
    }
    res.json(order)
}

const createOrders = async (req, res) => {
    const { supplierId, dateOrder, status } = req.body
    if (!supplierId) {
        return res.status(400).send("supplierId is required")
    }
    const order = await Order.create({ supplierId, dateOrder, status })
    const result = await Order.find()
    res.json({ result })
}

module.exports = { getAllOrders, getOrderByIDSuppliers, createOrders }