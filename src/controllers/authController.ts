import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Prisma } from "@prisma/client";

import prisma from "../lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "smart-inventory-secret";
const JWT_EXPIRES_IN = "1d";
const SALT_ROUNDS = 10;

const createToken = (userId: number, email: string) => {
    return jwt.sign({ userId, email }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    });
};

const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
        return res.status(400).json({
            message: "name, email, and password must be strings",
        });
    }

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedName || !normalizedEmail || !password) {
        return res.status(400).json({
            message: "name, email, and password are required",
        });
    }

    if (!isValidEmail(normalizedEmail)) {
        return res.status(400).json({
            message: "email is invalid",
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            message: "password must be at least 6 characters",
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const user = await prisma.user.create({
            data: {
                name: normalizedName,
                email: normalizedEmail,
                password: hashedPassword,
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        const token = createToken(user.id, user.email);

        return res.status(201).json({
            message: "Register successful",
            data: {
                user,
                token,
            },
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            return res.status(409).json({
                message: "email already registered",
            });
        }

        return res.status(500).json({
            message: "Failed to register user",
        });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (typeof email !== "string" || typeof password !== "string") {
        return res.status(400).json({
            message: "email and password must be strings",
        });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
        return res.status(400).json({
            message: "email and password are required",
        });
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: normalizedEmail,
            },
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const token = createToken(user.id, user.email);

        return res.json({
            message: "Login successful",
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                },
                token,
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to login",
        });
    }
};
