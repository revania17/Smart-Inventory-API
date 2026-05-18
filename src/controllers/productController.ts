import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import prisma from "../lib/prisma";
import { fetchProductByBarcode } from "../services/openFoodFactsService";

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await prisma.product.findMany({
            orderBy: { id: "asc" },
        });

        res.json(products);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch products",
        });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400).json({
            message: "Invalid product id",
        });
    }

    try {
        const product = await prisma.product.findUnique({
            where: { id },
        });

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch product",
        });
    }
};

export const addProduct = async (req: Request, res: Response) => {
    const { name, brand, category, stock } = req.body;

    if (!name || !brand || !category || typeof stock !== "number") {
        return res.status(400).json({
            message: "name, brand, category, and stock are required",
        });
    }

    if (stock < 0) {
        return res.status(400).json({
            message: "stock must be greater than or equal to 0",
        });
    }

    try {
        const product = await prisma.product.create({
            data: {
                name,
                brand,
                category,
                stock,
            },
        });

        res.status(201).json({
            message: "Product added",
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to add product",
        });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400).json({
            message: "Invalid product id",
        });
    }

    const { name, brand, category, stock } = req.body;

    if (!name || !brand || !category || typeof stock !== "number") {
        return res.status(400).json({
            message: "name, brand, category, and stock are required",
        });
    }

    if (stock < 0) {
        return res.status(400).json({
            message: "stock must be greater than or equal to 0",
        });
    }

    try {
        const product = await prisma.product.update({
            where: { id },
            data: {
                name,
                brand,
                category,
                stock,
            },
        });

        res.json({
            message: "Product updated",
            data: product,
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.status(500).json({
            message: "Failed to update product",
        });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400).json({
            message: "Invalid product id",
        });
    }

    try {
        await prisma.product.delete({
            where: { id },
        });

        res.json({
            message: "Product deleted",
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.status(500).json({
            message: "Failed to delete product",
        });
    }
};

export const addProductByBarcode = async (req: Request, res: Response) => {
    const { barcode } = req.body;

    if (!barcode || typeof barcode !== "string") {
        return res.status(400).json({
            message: "barcode is required",
        });
    }

    try {
        const externalProduct = await fetchProductByBarcode(barcode);

        const product = await prisma.product.create({
            data: {
                name: externalProduct.name,
                brand: externalProduct.brand,
                category: externalProduct.category,
                stock: 0,
            },
        });

        res.status(201).json({
            message: "Produk berhasil ditambahkan",
            data: product,
        });
    } catch (error) {
        if (error instanceof Error) {
            const statusCode = error.message === "PRODUCT_NOT_FOUND" ? 404 : 502;

            return res.status(statusCode).json({
                message:
                    error.message === "PRODUCT_NOT_FOUND"
                        ? "Product not found in OpenFoodFacts"
                        : "Failed to fetch product from OpenFoodFacts",
            });
        }

        res.status(500).json({
            message: "Failed to add product by barcode",
        });
    }
};
