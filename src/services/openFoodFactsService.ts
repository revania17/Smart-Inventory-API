import axios from "axios";

type OpenFoodFactsResponse = {
    status: number;
    product?: {
        product_name?: string;
        brands?: string;
        categories?: string;
    };
};

export const fetchProductByBarcode = async (barcode: string) => {
    const sanitizedBarcode = barcode.trim();

    const response = await axios.get<OpenFoodFactsResponse>(
        `https://world.openfoodfacts.org/api/v0/product/${sanitizedBarcode}.json`
    );

    if (response.data.status !== 1 || !response.data.product) {
        throw new Error("PRODUCT_NOT_FOUND");
    }

    return {
        name: response.data.product.product_name?.trim() || "Unknown Product",
        brand: response.data.product.brands?.trim() || "Unknown Brand",
        category: response.data.product.categories?.trim() || "Uncategorized",
    };
};
