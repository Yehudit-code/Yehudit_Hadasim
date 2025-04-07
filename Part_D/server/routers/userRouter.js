const express = require("express")
const router = express.Router()

const userController = require("../controllers/userController")

router.get("/", userController.getAllSuppliers)
router.get("/:id", userController.getSupplierByID)
router.post("/supplier", userController.createSupplier)
router.post("/owner", userController.createOwner)

module.exports = router