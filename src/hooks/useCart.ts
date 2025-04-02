import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetProductsByItems, cleanupCartProductsFullInfo } from "@store/Cart/cartSlice";
import { resetOrderStates } from "@store/order/orderSlice";
import actUpdateCart from "@store/Cart/act/actUpdateCart";
import { useNavigate } from "react-router-dom";
export default function useCart() {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const {items, loading ,error, productsFullInfo} = useAppSelector((state) => state.cart)

    const orderStatus = useAppSelector((state) => state.order.loading)

    const userAccessToken = useAppSelector(state => state.auth.accessToken)

    const products = productsFullInfo.map((el)=> ({...el, quantity: items[el.id] }))

    const changeQuantityHandler = useCallback( (id: number , quantity:number)=>{
        dispatch(actUpdateCart({ productId:id , quantity:quantity , actionType:"updateQuantity"}))
    },[dispatch]);

    const removeItemHandler = useCallback( (id: number)=>{
        dispatch(actUpdateCart({ productId:id  , actionType:"removeItem"}))
    },[dispatch]);

    useEffect(()=>{
        const promise = dispatch(actGetProductsByItems());
        return ()=>{
            promise.abort();
            dispatch(cleanupCartProductsFullInfo());
            dispatch(resetOrderStates());
        }
    },[dispatch]);

return {
    orderStatus ,
    loading ,
    error ,
    products,
    removeItemHandler ,
    changeQuantityHandler ,
    userAccessToken,
    navigate
}
}
