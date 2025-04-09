const express = require("express")
const router = express.Router()

const orderController = require("../controllers/orderController")

router.get("/", orderController.getAllOrders)
router.get("/existingOrders", orderController.getExistingOrders)
router.get("/pendingOrders", orderController.getPendingOrders)
router.get("/:id", orderController.getOrderByIDSuppliers)
router.post("/", orderController.createOrders)
router.put("/:id", orderController.updateOrderStatus);

module.exports = router