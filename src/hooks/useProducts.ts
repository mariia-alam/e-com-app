import { useAppSelector, useAppDispatch } from "@store/hooks";
import { actGetProductsByPrefix, productCleanup } from "@store/products/productsSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";


export default function useProducts() {
    const params = useParams();
    const prefix = params.prefix;
    const dispatch = useAppDispatch();

    const cartItems = useAppSelector((state)=> state.cart.items);
    const { loading, error, records } = useAppSelector(state => state.products);
    const  wishListItemsId  = useAppSelector(state => state.wishlist.itemsId);

    const productsFullInfo =  records.map(el=> ({
        ...el,
        quantity:cartItems[el.id] || 0,
        isLiked: wishListItemsId.includes(el.id),
        }))

    useEffect(() => {
        const promise = dispatch(actGetProductsByPrefix(prefix as string));
        return () => {
        dispatch(productCleanup());
        promise.abort();
        };
    }, [dispatch, prefix]);

    return {loading, error , prefix , productsFullInfo , records}
}
