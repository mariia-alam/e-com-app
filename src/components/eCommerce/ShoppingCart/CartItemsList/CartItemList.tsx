import {CartItem} from "@components/eCommerce";
import { Tproducts } from "@customtypes";
import {motion , AnimatePresence} from "framer-motion";
// import { Col, Row } from "react-bootstrap";

type CartItemListProps = {
    products : Tproducts[]
    changeQuantityHandler: (id:number , quantity: number)=> void
    removeItem: (id:number) => void
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.3 },
    },
};

const  CartItemList = ({products, changeQuantityHandler, removeItem}: CartItemListProps) => {


    return (
            <motion.div
                initial="hidden"
                animate="visible"
                layout
                variants={containerVariants}
            >
                <AnimatePresence mode="sync">
                    {products.map((el) => (
                            <CartItem
                                removeItem={removeItem}
                                changeQuantityHandler={changeQuantityHandler}
                                key={el.id}
                                {...el}
                            />
                    ))}
                </AnimatePresence>
            </motion.div>
    )
}

export default CartItemList