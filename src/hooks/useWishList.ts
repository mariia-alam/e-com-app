import { useEffect } from "react";
import { actGetWishList } from "@store/WishList/wishListSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { productCleanup } from "@store/WishList/wishListSlice";

export default function useWishList() {
        const dispatch = useAppDispatch();

    const {error, loading ,productsFullInfo } = useAppSelector(state=> state.wishlist)
    const cartItems = useAppSelector((state)=> state.cart.items);
    const products =  productsFullInfo.map(el=> ({
        ...el,
        quantity:cartItems[el.id] || 0,
        isLiked: true,
        isAuthenticated:true,

    }))

    useEffect(()=>{
        const promise = dispatch(actGetWishList("fullInfo"));
        return ()=>{
            promise.abort();
            dispatch(productCleanup());
        }
    },[dispatch]);

  return {loading, error ,products , productsFullInfo }
}
