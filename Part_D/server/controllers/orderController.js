const Order = require("../models/Order")
const User = require("../models/User")
const Product = require("../models/Product");

const getAllOrders = async (req, res) => {
    try {
        console.log("Fetching all orders...");
        const orders = await Order.find({}, ' supplierId dateOrder status')
            .populate('supplierId', 'name')
            .lean();
        if (!orders) {
            return res.status(404).send("no orders!")
        }
        res.json(orders)
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).send("Internal Server Error");
    }
}

const getOrderByIDSuppliers = async (req, res) => {
    const { id } = req.params
    try{
    const orders = await User.find({ supplierId: id }, 'dateOrder status productId')
        .populate('name', 'quantity').lean()
        if (!orders || orders.length === 0) {
            return res.status(404).send("No orders found for this supplier!");
        }
    res.json(orders)
    }catch (error) {
        console.error("Error fetching orders for supplier:", error);
        res.status(500).send("Internal Server Error");
    }
}

const createOrders = async (req, res) => {
    const { supplierId, dateOrder, status, orderDetails } = req.body
    console.log(req.body);

    if (!supplierId || !orderDetails || orderDetails.length === 0) {
        return res.status(400).send("supplierId and orderDetails are required");
    }

    const order = await Order.create({ supplierId, dateOrder, status })
    for (let detail of orderDetails) {
        const product = await Product.findById(detail.productId); // שליפת המוצר מהמודל
        if (!product) {
            return res.status(404).send("Product not found");
        }

        const orderDetail = {
            product: detail.productId,
            quantity: detail.quantity,
            productInfo: {  // שמירה של המידע של המוצר
                name: product.name,
                price: product.pricePerUnit,  // המחיר של המוצר
            }
        };

        order.orderDetails.push(orderDetail);
    }
    await order.save();

    const result = await Order.findById(order._id).populate('orderDetails');
    res.json({ result });
}

module.exports = { getAllOrders, getOrderByIDSuppliers, createOrders }