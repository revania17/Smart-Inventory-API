import express from "express";
import swaggerUi from "swagger-ui-express";

import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import swaggerSpec from "./swagger";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
    res.json({
        message: "Smart Inventory API Running",
        documentation: "http://localhost:3000/api-docs",
    });
});

app.use("/auth", authRoutes);
app.use("/", authRoutes);
app.use("/products", productRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
