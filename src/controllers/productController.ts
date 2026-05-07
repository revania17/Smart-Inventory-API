import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const getProducts = async (req: Request, res: Response) => {
    const products = await prisma.product.findMany();

    res.json(products);
};

export const addProduct = async (req: Request, res: Response) => {
    const { name, brand, stock } = req.body;

    const product = await prisma.product.create({
        data: {
            name,
            brand,
            stock,
        },
    });

    res.status(201).json({
        message: "Product added",
        data: product,
    });
};

export const updateProduct = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const { name, brand, stock } = req.body;

    const product = await prisma.product.update({
        where: { id },
        data: {
            name,
            brand,
            stock,
        },
    });

    res.json({
        message: "Product updated",
        data: product,
    });
};

export const deleteProduct = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    await prisma.product.delete({
        where: { id },
    });

    res.json({
        message: "Product deleted",
    });
};