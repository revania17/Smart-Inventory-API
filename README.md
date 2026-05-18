# Smart Inventory API with Product Barcode

## Deskripsi Project
Smart Inventory API adalah REST API untuk manajemen inventaris barang yang dibangun menggunakan Node.js, Express, TypeScript, dan Prisma ORM.
Sistem ini menyediakan fitur CRUD produk serta integrasi dengan OpenFoodFacts API untuk menambahkan produk otomatis berdasarkan barcode.

## Konsep Sistem
Sistem ini terdiri dari dua bagian utama:

### 1. Internal API (API Buatan Sendiri)
Digunakan untuk mengelola data inventaris barang:
- Menampilkan semua produk
- Menampilkan detail satu produk
- Menambahkan produk manual
- Mengubah data produk
- Menghapus produk
- Menyimpan data ke database

### 2. External API (OpenFoodFacts)
Digunakan untuk mengambil data produk berdasarkan barcode seperti:
- Nama produk
- Brand
- Kategori produk

## Teknologi yang Digunakan
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- SQLite
- Postman
- OpenFoodFacts API

## Endpoint API
### Get All Products
`GET /products`

Fungsi:
Mengambil semua data produk dari database.

### Get Product By ID
`GET /products/:id`

Fungsi:
Mengambil satu data produk berdasarkan ID.

### Add Product Manual
`POST /products`

Body:
```json
{
  "name": "Indomie",
  "brand": "Indofood",
  "category": "Mie Instan",
  "stock": 10
}
```

Fungsi:
Menambahkan data produk secara manual ke database.

### Update Product
`PUT /products/:id`

Body:
```json
{
  "name": "Indomie Goreng",
  "brand": "Indofood",
  "category": "Mie Instan",
  "stock": 15
}
```

Fungsi:
Mengubah data produk berdasarkan ID.

### Delete Product
`DELETE /products/:id`

Fungsi:
Menghapus produk berdasarkan ID.

### Add Product via Barcode
`POST /products/barcode`

Body:
```json
{
  "barcode": "737628064502"
}
```

Fungsi:
Mengambil data dari OpenFoodFacts berdasarkan barcode, lalu menyimpannya ke database dengan `stock` default `0`.

## Flow Sistem Barcode
1. User mengirim barcode ke API.
2. Backend melakukan request ke OpenFoodFacts API.
3. Sistem menerima data produk dari API eksternal.
4. Data diproses dan disimpan ke database.
5. Sistem mengembalikan response ke user.

## Contoh Response API Eksternal
```json
{
  "product": {
    "product_name": "Thai peanut noodle kit includes stir-fry rice noodles & thai peanut seasoning",
    "brands": "Simply Asia, Thai Kitchen",
    "categories": "Plant-based foods and beverages, Plant-based foods, Cereals and potatoes, Cereals and their products, Pastas, Noodles, Rice Noodles"
  }
}
```

## Contoh Response API Saya
```json
{
  "message": "Produk berhasil ditambahkan",
  "data": {
    "id": 4,
    "name": "Thai peanut noodle kit includes stir-fry rice noodles & thai peanut seasoning",
    "brand": "Simply Asia, Thai Kitchen",
    "category": "Plant-based foods and beverages, Plant-based foods, Cereals and potatoes, Cereals and their products, Pastas, Noodles, Rice Noodles",
    "stock": 0
  }
}
```

## Cara Instalasi dan Penggunaan
### 1. Clone Repository

### 2. Install Dependency
```bash
npm install
```

### 3. Setup Database (.env)
```env
DATABASE_URL="file:./dev.db"
```

### 4. Jalankan Prisma Migration
```bash
npx prisma migrate dev
```

### 5. Jalankan Server
```bash
npm run dev
```

Server berjalan di:
`http://localhost:3000`

## Testing API (Postman)
Gunakan Postman untuk mencoba endpoint berikut:
- `GET /products`
- `GET /products/:id`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`
- `POST /products/barcode`

## Status Project
`✔` API REST berjalan
`✔` Database terhubung
`✔` CRUD produk selesai
`✔` Integrasi OpenFoodFacts berhasil
`✔` Endpoint barcode berhasil diuji
