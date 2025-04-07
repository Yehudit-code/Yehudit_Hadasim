const User = require("../models/User")

const getAllSuppliers = async (req, res) => {
    //await User.find({roles:"supplier"}).populate("products");
    const suppliers = await User.find({ roles: "supplier" }).lean()
    if (!suppliers) {
        return res.status(404).send("no suppliers!")
    }
    res.json(suppliers)
}

const getSupplierByID = async (req, res) => {
    const { id } = req.params
    const supplier = await User.findOne({ _id: id, role: "supplier" }).populate("products");
    if (!supplier) {
        return res.status(404).send("no supplier!")
    }
    res.json(supplier)
}

const createSupplier = async (req, res) => {
    const { name, username, password, roles, companyName, phoneNumber, representativeName, email, address, phone, products } = req.body
    if (!name || !username || !password) {
        return res.status(400).send("name,username and password are required")
    }
    const supplier = await User.create({ name, username, password, roles, companyName, phoneNumber, representativeName, email, address, phone, products })
    const result = await User.find()
    res.json({ result })
}

const createOwner = async (req, res) => {
    const { name, username, password, roles, email, address, phone } = req.body
    if (!name || !username || !password) {
        return res.status(400).send("name,username and password are required")
    }
    const existingUser = await User.findOne({ username })
    if (existingUser)
        return res.status(400).send("username must be unique")
    const owner = await User.create({ name, username, password, roles, email, address, phone })
    const result = await User.find({roles:"owner"})
    res.json({ result })
}

module.exports = { getAllSuppliers, getSupplierByID, createSupplier, createOwner }