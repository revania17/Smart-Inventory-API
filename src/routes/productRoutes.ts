import express from "express";

import {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    addProductByBarcode,
} from "../controllers/productController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Menampilkan semua produk
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Daftar produk berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Gagal mengambil data produk
 */
router.get("/", getProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Menampilkan detail produk berdasarkan ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Detail produk berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: ID produk tidak valid
 *       404:
 *         description: Produk tidak ditemukan
 *       500:
 *         description: Gagal mengambil produk
 */
router.get("/:id", getProductById);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Menambahkan produk secara manual
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: Produk berhasil ditambahkan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse'
 *       400:
 *         description: Input produk tidak valid
 *       401:
 *         description: Token tidak ditemukan
 *       403:
 *         description: Token tidak valid atau sudah expired
 *       500:
 *         description: Gagal menambahkan produk
 */
router.post("/", authenticateToken, addProduct);

/**
 * @swagger
 * /products/barcode:
 *   post:
 *     summary: Menambahkan produk dari OpenFoodFacts berdasarkan barcode
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BarcodeInput'
 *     responses:
 *       201:
 *         description: Produk dari OpenFoodFacts berhasil ditambahkan ke database
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse'
 *       400:
 *         description: Barcode tidak valid
 *       401:
 *         description: Token tidak ditemukan
 *       403:
 *         description: Token tidak valid atau sudah expired
 *       404:
 *         description: Produk tidak ditemukan di OpenFoodFacts
 *       502:
 *         description: Gagal mengambil data dari OpenFoodFacts
 */
router.post("/barcode", authenticateToken, addProductByBarcode);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Mengubah data produk berdasarkan ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: Produk berhasil diperbarui
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductResponse'
 *       400:
 *         description: ID atau input produk tidak valid
 *       401:
 *         description: Token tidak ditemukan
 *       403:
 *         description: Token tidak valid atau sudah expired
 *       404:
 *         description: Produk tidak ditemukan
 *       500:
 *         description: Gagal memperbarui produk
 */
router.put("/:id", authenticateToken, updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Menghapus produk berdasarkan ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Produk berhasil dihapus
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       400:
 *         description: ID produk tidak valid
 *       401:
 *         description: Token tidak ditemukan
 *       403:
 *         description: Token tidak valid atau sudah expired
 *       404:
 *         description: Produk tidak ditemukan
 *       500:
 *         description: Gagal menghapus produk
 */
router.delete("/:id", authenticateToken, deleteProduct);

export default router;
