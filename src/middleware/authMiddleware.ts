import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "smart-inventory-secret";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : undefined;

    if (!token) {
        res.status(401).json({
            message: "Access token is required",
        });
        return;
    }

    try {
        jwt.verify(token, JWT_SECRET);
        next();
    } catch (error) {
        res.status(403).json({
            message: "Invalid or expired token",
        });
    }
};
