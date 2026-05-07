import express from "express";
import axios from "axios";

import productRoutes from "./routes/productRoutes";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Smart Inventory API Running",
    });
});

app.use("/products", productRoutes);

app.get("/barcode/:code", async (req, res) => {
    const barcode = req.params.code;

    try {
        const response = await axios.get(
            `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
        );

        const product = response.data.product;

        res.json({
            name: product.product_name,
            brand: product.brands,
            category: product.categories,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch product",
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});