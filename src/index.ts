import express from "express";

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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
