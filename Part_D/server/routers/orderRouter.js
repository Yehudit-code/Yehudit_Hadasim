const express = require("express")
const router = express.Router()

const orderController = require("../controllers/orderController")

router.get("/", orderController.getAllOrders)
router.get("/:id", orderController.getOrderByIDSuppliers)
router.post("/", orderController.createOrders)
// router.put("/", postController.updatePost)
// router.delete("/:id", postController.deletePost)

module.exports = router