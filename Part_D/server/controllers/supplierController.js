const Supplier = require("../models/Supplier")

const getAllSuppliers = async (req, res) => {
    const suppliers = await Supplier.find().lean()
    if (!suppliers) {
        return res.status(404).send("no suppliers!")
    }
    res.json(suppliers)
}

const getSupplierByID = async (req, res) => {
    const { id } = req.params
    const supplier = await User.findById(id).lean()
    if (!supplier) {
        return res.status(404).send("no supplier!")
    }
    res.json(supplier)
}

const createSupplier = async (req, res) => {
    const { name, pricePerUnit } = req.body
    if (!name || !pricePerUnit) {
        return res.status(400).send("name and pricePerUnit are required")
    }
    const supplier = await Supplier.create({ name, pricePerUnit, quantity, minimumQuantity })
    const result = await Supplier.find()
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

module.exports = { getAllSuppliers, getSupplierByID, createSupplier }