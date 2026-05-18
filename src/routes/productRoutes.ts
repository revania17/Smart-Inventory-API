import express from "express";

import {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    addProductByBarcode,
} from "../controllers/productController";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", addProduct);
router.post("/barcode", addProductByBarcode);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
