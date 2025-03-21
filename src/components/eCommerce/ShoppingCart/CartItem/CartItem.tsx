import { Form, Badge } from "react-bootstrap";
import styles from "./styles.module.css";
import { Tproducts } from "@customtypes";
import { memo } from "react";
import LazyImage from "@components/common/LazyImage/LazyImage";
import {motion} from "framer-motion"
import { MotionButton } from "@components/common";
const { cartItem, product , productInfo, cartItemSelection, customBadge } = styles;

type CartItemProps = Tproducts & {
    changeQuantityHandler: (id:number , quantity: number)=> void
    removeItem: (id:number) => void
}
const productVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale:1, transition: { duration: 0.4 } },
};

const CartItem = memo( ({title, id , img, price , cat_prefix, max , quantity, changeQuantityHandler, removeItem}: CartItemProps) => {

    const renderOption  = Array(max).fill(0).map((_,idx)=>{
        const quantity = ++idx
        return (
            <option value={quantity} key={idx}>{quantity}</option>
        )
    }); //[0,0,0,0]

    const changeQuantity = async (event: React.ChangeEvent<HTMLSelectElement> )=>{
    const quantity = +event.currentTarget.value;
        changeQuantityHandler(id, quantity);

    }
    const remove = ()=>{
        removeItem(id);
    }


    return (
        <motion.div
            exit={{ opacity: 0, x: 50, transition: { duration: 0.5, ease: "easeInOut" } }}
            layout
            key={id}
            className={cartItem} variants={productVariants}
            >
            <div className={product}>
                    <LazyImage src={img} alt={title} />
                    <div className={productInfo}>
                        <h2>{title}</h2>
                        <h3 className="fs-6">{cat_prefix} products</h3>
                        <h3 className="fs-6">Price: <Badge bg="" className={customBadge}>{price.toFixed(2)} $</Badge></h3>
                        <h3 className="fs-6">
                            Total price:
                            <motion.div
                                key={quantity}
                                initial={{ scale: 1 }}
                                animate={{ scale: [1, 1.2, 1]
                                }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                style={{ display: "inline-block" }}
                            >
                                <Badge bg="" className={customBadge}>
                                    {quantity && (quantity * price).toFixed(2)} $
                                </Badge>
                            </motion.div>
                        </h3>
                    </div>
            </div>

            <div className={cartItemSelection}>
                <div className="text-center">
                    <span>Quantity</span>
                    <Form.Select onChange={changeQuantity} value={quantity} aria-label="Default select example">
                        {renderOption}
                    </Form.Select>
                </div>
                <MotionButton
                    className={styles.customButton}
                    variant=""
                    onClick={remove}
                    whileTap={{ scale: [0.8,1] }}
                >
                    Remove
                </MotionButton>
            </div>
        </motion.div>
    );
});

export default CartItem;