import { useQuery } from "@tanstack/react-query";
import { Product } from "../stores/cartItemsStore"

export type Products = {
    products: Product[];
}

const fetchCategoryProducts = async (category : string): Promise<Products> => {
    const data = await fetch(`https://uomo-backend-91j6.onrender.com/category/${encodeURIComponent(category)}`);
    if (!data.ok) {
        throw new Error("Failed to fetch category products");
    }
    return await data.json();
}

export default function useCategoryProducts(category : string, enabled = true) {
    return useQuery<Products>({
        queryKey: ["category", category],
        queryFn: () => fetchCategoryProducts(category),
        staleTime: 1000 * 60,
        enabled
    });
}