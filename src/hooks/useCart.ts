import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetProductsByItems, cleanupCartProductsFullInfo } from "@store/Cart/cartSlice";
import { cartItemChangeQuantity, removeCartItem } from "@store/Cart/cartSlice";

export default function useCart() {
    const dispatch = useAppDispatch();
    const {items, loading ,error, productsFullInfo} = useAppSelector((state) => state.cart)

    const products = productsFullInfo.map((el)=> ({...el, quantity: items[el.id] }))

    const changeQuantityHandler = useCallback( (id: number , quantity:number)=>{
        dispatch(cartItemChangeQuantity({id, quantity}))
    },[dispatch]);

    const removeItemHandler = useCallback( (id: number)=>{
        dispatch(removeCartItem(id))
    },[dispatch]);

    useEffect(()=>{
        const promise = dispatch(actGetProductsByItems());
        return ()=>{
            promise.abort();
            dispatch(cleanupCartProductsFullInfo());
        }
    },[dispatch]);

return {loading , error , products , removeItemHandler , changeQuantityHandler , }
}
