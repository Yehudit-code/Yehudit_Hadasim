const Product = require("../models/Product")
const User = require("../models/User");

const getAllProducts = async (req, res) => {
    const products = await Product.find().lean()
    if (!products) {
        return res.status(404).send("no products!")
    }
    res.json(products)
}

const getProductsBySupplierID = async (req, res) => {
    const { id } = req.params
    const products = await User.find({_id:id})
    if (!products) {
        return res.status(404).send("no products")
    }
    res.json(products)
}

const createProduct = async (req, res) => {
    const {supplierId, name,pricePerUnit,quantity, minimumQuantity} = req.body
    if ( !supplierId ||!name || !pricePerUnit ) {
        return res.status(400).send("supplierId, name and pricePerUnit are required")
    }
    const product = await Product.create({ supplierId, name, pricePerUnit, quantity, minimumQuantity })
    await User.findByIdAndUpdate(supplierId, {
        $push: { products: product._id }
      })
    const  result= await Product.find({supplierId:supplierId})
    if (!result) {
        return res.status(404).send("no products")
    }
    res.json({ result })
}
module.exports = { getAllProducts, getProductsBySupplierID, createProduct }
