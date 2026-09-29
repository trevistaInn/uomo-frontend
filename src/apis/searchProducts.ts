import { useQuery } from "@tanstack/react-query";
import { Products } from "./categoryProducts";

const fetchSearchedProducts = async (
    search: string,
    signal?: AbortSignal
): Promise<Products> => {
    const response = await fetch(`https://uomo-backend-91j6.onrender.com/search?q=${encodeURIComponent(search)}`,{ signal });
    if (!response.ok) {
        throw new Error("Failed to fetch searched products");
    }
    return response.json();
};

export default function useSearchedProducts(
    search: string,
    enabled = true
) {
    return useQuery({
        queryKey: ["search", search],
        queryFn: ({ signal }) => fetchSearchedProducts(search, signal),
        enabled,
        staleTime: 1000 * 60 * 5,
    });
}