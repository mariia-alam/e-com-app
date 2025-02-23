import store from "@store/index";
import actGetProductsByPrefix from "@store/products/act/actGetProductsByCatPrefix";
import { productCleanup } from "@store/products/productsSlice";

export const ProductsLoader = async (prefix: string) => {
    store.dispatch(productCleanup());
    const result = await store.dispatch(actGetProductsByPrefix(prefix as string));
    
    if (actGetProductsByPrefix.fulfilled.match(result)) {
        return result.payload;
    } else {
        throw new Response("Failed to fetch products", { status: 500 });
    }
};
