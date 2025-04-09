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
    const products = await Product.find({supplierId:id})
    if (!products) {
        res.send("no products")
        return res.status(404).send("no products")
    }
    res.json(products)
}

const createProduct = async (req, res) => {
    const { supplierId, products } = req.body; // מקבלים את רשימת המוצרים

    if (!supplierId || !products || !products.length) {
        return res.status(400).send("supplierId and products are required");
    }

    try {
        const createdProducts = [];

        // מוסיפים את כל המוצרים אחד אחד
        for (let product of products) {
            const { name, pricePerUnit, quantity, minimumQuantity } = product;

            if (!name || !pricePerUnit) {
                return res.status(400).send("name and pricePerUnit are required for each product");
            }

            const newProduct = await Product.create({ 
                supplierId, 
                name, 
                pricePerUnit, 
                quantity, 
                minimumQuantity 
            });

            // דוחפים את המוצר שנוסף לרשימה
            createdProducts.push(newProduct);
        }

        // מעדכנים את הספק עם המוצרים החדשים
        await User.findByIdAndUpdate(supplierId, {
            $push: { products: { $each: createdProducts.map(product => product._id) } }
        });

        res.json({ success: true, createdProducts });
    } catch (error) {
        console.error('שגיאה בהוספת המוצרים:', error);
        res.status(500).send("שגיאה בהוספת המוצרים");
    }
    // const {supplierId, name,pricePerUnit,quantity, minimumQuantity} = req.body
    // if ( !supplierId ||!name || !pricePerUnit ) {
    //     return res.status(400).send("supplierId, name and pricePerUnit are required")
    // }
    // const product = await Product.create({ supplierId, name, pricePerUnit, quantity, minimumQuantity })
    // await User.findByIdAndUpdate(supplierId, {
    //     $push: { products: product._id }
    //   })
    // const  result= await Product.find({supplierId:supplierId})
    // if (!result) {
    //     return res.status(404).send("no products")
    // }
    // res.json({ result })
}
module.exports = { getAllProducts, getProductsBySupplierID, createProduct }
