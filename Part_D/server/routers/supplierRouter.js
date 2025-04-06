const express = require("express")
const router = express.Router()

const supplierController = require("../controllers/supplierController")

router.get("/", supplierController.getAllSuppliers)
router.get("/:id", supplierController.getSupplierByID)
router.post("/", supplierController.createSupplier)
// router.put("/", postController.updatePost)
// router.delete("/:id", postController.deletePost)

module.exports = router