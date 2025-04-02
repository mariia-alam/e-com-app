import { motion, AnimatePresence } from "framer-motion";
import { Heading } from "@components/common";
import { CartItemList, SubTotalPrice } from "@components/eCommerce";
import { Container } from "react-bootstrap";
import { Loading, LottieHandler } from "@components/feedback";
import useCart from "@hooks/useCart";
import { useState, useEffect } from "react";

const Cart = () => {

    const {
        loading,
        error,
        changeQuantityHandler,
        removeItemHandler,
        products,
        userAccessToken,
        orderStatus,
        navigate,
    } = useCart();

    const [showLottie, setShowLottie] = useState(false);

    useEffect(() => {
        if (products.length === 0) {
            const timer = setTimeout(() => setShowLottie(true),400);
            return () => clearTimeout(timer);
        } else {
            setShowLottie(false);
        }
    }, [products]);


return (
    <Container>
        <Heading title="Cart" />
        <Loading status={loading} error={error} type="cart">
            <AnimatePresence mode="wait">
                {products.length > 0 ? (
                    <>
                        <motion.div
                            layout
                            exit={{ opacity: 0, x: 50, transition: { duration: 0.5, ease: "easeInOut" } }}
                        >
                            <CartItemList
                                removeItem={removeItemHandler}
                                changeQuantityHandler={changeQuantityHandler}
                                products={products}
                            />
                        </motion.div>
                        <motion.div
                            key={products.length}
                            initial={{ opacity: 0, y: 60 }}
                            animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.7 } }}
                            exit={{ opacity: 0, x: 50, transition: { duration: 0.4, ease: "easeInOut" } }}
                        >
                        <>
                            <SubTotalPrice
                                userAccessToken={userAccessToken}
                                products={products}
                            />
                        </>
                        </motion.div>
                    </>
                ) : (
                    showLottie && (
                        <motion.div
                            initial= {{ opacity: 0, y: 60 }}
                            animate= {{ opacity: 1, y: 0, transition: { duration: 0.4 } }}
                            exit= {{ opacity: 0, y: 60, transition: { duration: 0.4 } }}
                        >
                            {orderStatus === "succeeded" ? (
                                <>
                                <LottieHandler type="success" message="Your order has been confirmed successfully" />
                                <p onClick={()=> navigate("/orders")} className="text-center text-decoration-underline text-success" style={{ cursor: "pointer" }}>See orders</p>
                                </>
                            ) : (
                                <LottieHandler type="emptyCart" message="Your Cart is empty" />
                            )}
                        </motion.div>
                    )
                )}
            </AnimatePresence>
        </Loading>
    </Container>
);
};

export default Cart;
