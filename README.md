# Smart Inventory API with Product Barcode

## Deskripsi Project
Smart Inventory API adalah REST API untuk manajemen inventaris barang yang dibangun menggunakan Node.js, Express, TypeScript, dan Prisma ORM.
Sistem ini menyediakan fitur CRUD produk, autentikasi user dengan JWT, serta integrasi dengan OpenFoodFacts API untuk menambahkan produk otomatis berdasarkan barcode.

## Konsep Sistem
Sistem ini memiliki tiga bagian utama:

### 1. Internal API
Internal API digunakan untuk mengelola data inventaris barang, meliputi:
- Menampilkan semua produk
- Menampilkan detail satu produk
- Menambahkan produk manual
- Mengubah data produk
- Menghapus produk
- Menyimpan data ke database
- Proteksi endpoint tambah, ubah, hapus, dan tambah via barcode menggunakan JWT

### 2. Auth API
Auth API digunakan untuk autentikasi user, meliputi:
- Register user baru
- Login user
- Menghasilkan JWT token
- Penggunaan token melalui header `Authorization: Bearer <token>` pada endpoint yang membutuhkan autentikasi

### 3. External API (OpenFoodFacts)
External API OpenFoodFacts digunakan untuk mengambil data produk berdasarkan barcode, seperti:
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
- Swagger / OpenAPI
- OpenFoodFacts API

## Endpoint API
### Register
`POST /auth/register`

Endpoint alternatif:
`POST /register`

Body:
```json
{
  "name": "Admin Inventory",
  "email": "admin@example.com",
  "password": "secret123"
}
```

Fungsi:
Mendaftarkan user baru, menyimpan password dalam bentuk hash, dan mengembalikan JWT token sebagai akses autentikasi.

### Login
`POST /auth/login`

Endpoint alternatif:
`POST /login`

Body:
```json
{
  "email": "admin@example.com",
  "password": "secret123"
}
```

Fungsi:
Melakukan autentikasi berdasarkan email dan password, lalu mengembalikan JWT token jika data valid.

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

Header:
```http
Authorization: Bearer <token>
```

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

Header:
```http
Authorization: Bearer <token>
```

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

Header:
```http
Authorization: Bearer <token>
```

Fungsi:
Menghapus produk berdasarkan ID.

### Add Product via Barcode
`POST /products/barcode`

Header:
```http
Authorization: Bearer <token>
```

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

## Contoh Response API
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

Dokumentasi Swagger tersedia di:
`http://localhost:3000/api-docs`

## Testing API
Endpoint berikut dapat diuji menggunakan Postman atau Swagger:
- `POST /auth/register`
- `POST /auth/login`
- `GET /products`
- `GET /products/:id`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`
- `POST /products/barcode`

## Dokumentasi API
Dokumentasi Swagger dapat diakses setelah server dijalankan:
`http://localhost:3000/api-docs`

Swagger berisi dokumentasi endpoint autentikasi, CRUD produk, dan integrasi barcode OpenFoodFacts, termasuk contoh request body dan response.

## Arsitektur Project
Project ini termasuk **monolith modular**, bukan microservice.

Karakteristik arsitektur:
- Semua fitur berjalan dalam satu aplikasi Express.
- Modul auth, product, Swagger, Prisma, dan integrasi OpenFoodFacts berada dalam satu codebase.
- Data aplikasi menggunakan satu database SQLite.
- Belum terdapat service terpisah yang berjalan secara independen dengan database masing-masing.

Struktur project tetap dibuat modular melalui folder `controllers`, `routes`, `middleware`, `services`, dan `lib`. Dengan struktur ini, pengembangan fitur tetap terpisah berdasarkan tanggung jawab masing-masing bagian, meskipun aplikasi masih berjalan sebagai satu backend utama.

## Status Project
- API REST berjalan
- Database terhubung
- CRUD produk selesai
- Integrasi OpenFoodFacts tersedia
- Endpoint barcode tersedia
- Dokumentasi Swagger tersedia
- Register user tersedia
- Login user tersedia
- Password user disimpan dalam bentuk hash menggunakan bcrypt
- JWT token dibuat saat register dan login
- Endpoint tambah, ubah, hapus, dan barcode produk diproteksi menggunakan JWT
- Register dan login tersedia melalui `/auth/register`, `/auth/login`, serta endpoint alternatif `/register`, `/login`

## Progress Selanjutnya
- Menambahkan role user seperti admin dan staff
- Menambahkan refresh token atau mekanisme logout
- Menambahkan validasi input yang lebih lengkap
- Menambahkan automated test untuk auth dan produk
- Menyiapkan konfigurasi deployment
