import { Heading } from "@components/common";
import { CartItemList, SubTotalPrice } from "@components/eCommerce";
import { Container } from "react-bootstrap";
import { Loading, LottieHandler } from "@components/feedback";

import useCart from "@hooks/useCart";export default function Cart() {
    const {
            loading ,
            error ,
            changeQuantityHandler ,
            removeItemHandler ,
            products,
            userAccessToken,
            orderStatus,
        } = useCart();

    return (
    <Container>

        <Heading title="Cart"></Heading>
        <Loading status={loading} error={error} type="cart">
            {products.length  >0 ? (
                <>
                    <CartItemList removeItem={removeItemHandler}  changeQuantityHandler={changeQuantityHandler} products={products}></CartItemList>
                    <SubTotalPrice userAccessToken={userAccessToken} products={products}></SubTotalPrice>
                </>
            ): (orderStatus === "succeeded") ?
                <LottieHandler type="success" message="Your order has been confirmed successfully"></LottieHandler>
            :
                <LottieHandler type="emptyCart" message="Your cart is empty"></LottieHandler>
            }
        </Loading>
    </Container>
    )
}
