import { useQuery } from "@tanstack/react-query";
import { Product } from "../stores/cartItemsStore"

type HomeProductsResponse = {
    trendyProducts: Product[];
    limitedEditionProducts: Product[];
    uomoProducts: Product[];
}

const fetchHomeProducts = async (): Promise<HomeProductsResponse> => {
    const response = await fetch("https://uomo-backend-91j6.onrender.com/");
    if (!response.ok) {
        throw new Error("Failed to fetch home products");
    }
    return await response.json();
}

const useHomeProducts = () => {
    return useQuery<HomeProductsResponse>({
        queryKey: ["homeProducts"],
        queryFn: fetchHomeProducts,
        staleTime: 1000 * 60 * 5,
    });
}

export default useHomeProducts;