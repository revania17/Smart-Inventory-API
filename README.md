# Smart Inventory API with Product Barcode

## Deskripsi Project
Smart Inventory API adalah sebuah REST API untuk manajemen inventaris barang yang dibangun menggunakan Node.js, Express, TypeScript, dan Prisma ORM.
Sistem ini menyediakan fitur CRUD (Create, Read, Delete) untuk data produk, serta fitur unggulan berupa integrasi dengan OpenFoodFacts API untuk mendapatkan data produk secara otomatis berdasarkan barcode.
Dengan fitur ini, pengguna tidak perlu menginput data produk secara manual, karena sistem akan mengambil informasi produk langsung dari API eksternal berdasarkan kode barcode.

## Konsep Sistem
Sistem ini terdiri dari dua bagian utama:
### 1. Internal API (API Buatan Sendiri)
Digunakan untuk mengelola data inventaris barang:
- Menampilkan data produk
- Menambahkan produk
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
- MySQL / PostgreSQL
- Postman
- OpenFoodFacts API

## Endpoint API
### Get All Products
GET /products
Fungsi:
Mengambil semua data produk dari database.
### Add Product Manual
POST /products
Body:
{
  "name": "Indomie",
  "brand": "Indofood",
  "category": "Mie Instan",
  "stock": 10
}
Fungsi:
Menambahkan data produk secara manual ke database.
### Delete Product
DELETE /products/:id
Fungsi:
Menghapus produk berdasarkan ID.
### Add Product via Barcode (Fitur Utama)
POST /products/barcode
Body:
{
  "barcode": "8992761130012"
}
### Flow Sistem Barcode
1. User mengirim barcode ke API
2. Backend melakukan request ke OpenFoodFacts API
3. Sistem menerima data produk dari API eksternal
4. Data diproses dan disimpan ke database
5. Sistem mengembalikan response ke user

### Contoh Response API Eksternal
{
  "product": {
    "product_name": "Indomie Mi Goreng",
    "brands": "Indomie",
    "categories": "Mie Instan"
  }
}
### Contoh Response API Saya
{
  "message": "Produk berhasil ditambahkan",
  "data": {
    "name": "Indomie Mi Goreng",
    "brand": "Indomie",
    "category": "Mie Instan"
  }
}

## Cara Instalasi dan Penggunaan
### 1. Clone Repository
### 2. Install Dependency
npm install
### 3. Setup Database (.env)
DATABASE_URL="mysql://root@localhost:3306/inventory_db"
### 4. Jalankan Prisma Migration
npx prisma migrate dev
### 5. Jalankan Server
npm run dev
Server berjalan di:
http://localhost:3000

## Testing API (Postman)
Gunakan Postman untuk mencoba endpoint berikut:
- GET /products → melihat semua produk
- POST /products → tambah produk manual
- DELETE /products/:id → hapus produk
- POST /products/barcode → tambah produk dari barcode

## Status Project

✔ API REST berjalan  
✔ Database terhubung  
✔ CRUD produk selesai  
✔ Integrasi OpenFoodFacts berhasil  
✔ Endpoint barcode berhasil diuji di Postman  
