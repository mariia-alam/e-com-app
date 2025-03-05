import { Heading } from "@components/common";
import { CartItemList, SubTotalPrice } from "@components/eCommerce";
import { Container } from "react-bootstrap";
import { Loading } from "@components/feedback";
import useCart from "@hooks/useCart";
export default function Cart() {
    const {loading , error , changeQuantityHandler , removeItemHandler , products} = useCart();

    return (
    <Container>
        <Heading title="Cart"></Heading>
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
