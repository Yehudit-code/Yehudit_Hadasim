const bcrypt = require('bcrypt')
const User = require("../models/User")

const login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {// Confirm data
        return res.status(400).json({ message: 'All fields are required' })
    }
    try {
        const foundUser = await User.findOne({ username }).lean()
        if (!foundUser || !foundUser.active) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        const match = await bcrypt.compare(password, foundUser.password)
        if (!match) return res.status(401).json({ message: 'Unauthorized' })
        res.send("Logged In")
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}
const register = async (req, res) => {
    const { username, password, name, role, companyName, email, phone, representativeName, phoneNumber, products } = req.body
    if (!name || !username || !password) {// Confirm data
        return res.status(400).json({ message: 'All fields are required' })
    }
    try {
        const existing = await User.findOne({ username: username }).lean()
        if (existing) return res.status(400).json({ message: 'username already exists' })
        const hashedPwd = await bcrypt.hash(password, 10)
        const userObject = { name, email, username, phone, password: hashedPwd, role, companyName, representativeName, phoneNumber, products }
        const user = await User.create(userObject)
        if (user) { // Created
            return res.status(201).json({
                message: `New user ${user.username}
        created` })
        } else {
            return res.status(400).json({ message: 'Invalid user received' })
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}





module.exports = { login, register }
