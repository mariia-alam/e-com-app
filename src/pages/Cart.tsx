import { Heading } from "@components/common";
import { CartItemList, SubTotalPrice } from "@components/eCommerce";
import { Container } from "react-bootstrap";
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetProductsByItems } from "@store/Cart/cartSlice";
import { Loading } from "@components/feedback";
import { cartItemChangeQuantity, removeCartItem } from "@store/Cart/cartSlice";
export default function Cart() {

    const dispatch = useAppDispatch();
    const {items, loading ,error, productsFullInfo} = useAppSelector((state) => state.cart)

    useEffect(()=>{
        dispatch(actGetProductsByItems());
    },[dispatch]);

    const products = productsFullInfo.map((el)=> ({...el, quantity: items[el.id] }))

    const changeQuantityHandler = useCallback( (id: number , quantity:number)=>{
        dispatch(cartItemChangeQuantity({id, quantity}))
    },[dispatch]);

    const removeItemHandler = useCallback( (id: number)=>{
        dispatch(removeCartItem(id))
    },[dispatch]);

    return (
    <Container>
        <Heading>Cart</Heading>
        <Loading status={loading} error={error}>
            {products.length ? (
                <>
                    <CartItemList removeItem={removeItemHandler}  changeQuantityHandler={changeQuantityHandler} products={products}></CartItemList>
                    <SubTotalPrice products={products}></SubTotalPrice>
                </>
            ): (
                "Your Cart is empty"
            )}

        </Loading>
    </Container>
    )
}
