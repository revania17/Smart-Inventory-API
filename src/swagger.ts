import swaggerJsdoc from "swagger-jsdoc";

const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Smart Inventory API",
            version: "1.0.0",
            description:
                "REST API untuk manajemen inventaris produk dengan integrasi OpenFoodFacts berdasarkan barcode.",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Local development server",
            },
        ],
        tags: [
            {
                name: "Auth",
                description: "Endpoint untuk register, login, dan mendapatkan JWT token",
            },
            {
                name: "Products",
                description: "Endpoint untuk mengelola data produk inventaris",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                User: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                            example: 1,
                        },
                        name: {
                            type: "string",
                            example: "Admin Inventory",
                        },
                        email: {
                            type: "string",
                            format: "email",
                            example: "admin@example.com",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                            example: "2026-06-16T09:00:00.000Z",
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time",
                            example: "2026-06-16T09:00:00.000Z",
                        },
                    },
                },
                RegisterInput: {
                    type: "object",
                    required: ["name", "email", "password"],
                    properties: {
                        name: {
                            type: "string",
                            example: "Admin Inventory",
                        },
                        email: {
                            type: "string",
                            format: "email",
                            example: "admin@example.com",
                        },
                        password: {
                            type: "string",
                            format: "password",
                            minLength: 6,
                            example: "secret123",
                        },
                    },
                },
                LoginInput: {
                    type: "object",
                    required: ["email", "password"],
                    properties: {
                        email: {
                            type: "string",
                            format: "email",
                            example: "admin@example.com",
                        },
                        password: {
                            type: "string",
                            format: "password",
                            example: "secret123",
                        },
                    },
                },
                AuthResponse: {
                    type: "object",
                    properties: {
                        message: {
                            type: "string",
                            example: "Login successful",
                        },
                        data: {
                            type: "object",
                            properties: {
                                user: {
                                    $ref: "#/components/schemas/User",
                                },
                                token: {
                                    type: "string",
                                    example:
                                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example.signature",
                                },
                            },
                        },
                    },
                },
                Product: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                            example: 1,
                        },
                        name: {
                            type: "string",
                            example: "Indomie Goreng",
                        },
                        brand: {
                            type: "string",
                            example: "Indofood",
                        },
                        category: {
                            type: "string",
                            example: "Mie Instan",
                        },
                        stock: {
                            type: "integer",
                            example: 10,
                        },
                    },
                },
                ProductInput: {
                    type: "object",
                    required: ["name", "brand", "category", "stock"],
                    properties: {
                        name: {
                            type: "string",
                            example: "Indomie",
                        },
                        brand: {
                            type: "string",
                            example: "Indofood",
                        },
                        category: {
                            type: "string",
                            example: "Mie Instan",
                        },
                        stock: {
                            type: "integer",
                            minimum: 0,
                            example: 10,
                        },
                    },
                },
                BarcodeInput: {
                    type: "object",
                    required: ["barcode"],
                    properties: {
                        barcode: {
                            type: "string",
                            example: "737628064502",
                        },
                    },
                },
                ProductResponse: {
                    type: "object",
                    properties: {
                        message: {
                            type: "string",
                            example: "Product added",
                        },
                        data: {
                            $ref: "#/components/schemas/Product",
                        },
                    },
                },
                MessageResponse: {
                    type: "object",
                    properties: {
                        message: {
                            type: "string",
                            example: "Product deleted",
                        },
                    },
                },
            },
        },
    },
    apis: ["./src/routes/*.ts"],
});

export default swaggerSpec;
