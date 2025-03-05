import { Form, Button, Badge } from "react-bootstrap";
import styles from "./styles.module.css";
import { Tproducts } from "@customtypes";
import { memo } from "react";

const { cartItem, product, productImg, productInfo, cartItemSelection, customBadge } = styles;

type CartItemProps = Tproducts & {
    changeQuantityHandler: (id:number , quantity: number)=> void
    removeItem: (id:number) => void
}
const CartItem = memo( ({title, id , img, price , cat_prefix, max , quantity, changeQuantityHandler, removeItem}: CartItemProps) => {

    const renderOption  = Array(max).fill(0).map((_,idx)=>{
        const quantity = ++idx
        return (
            <option value={quantity} key={idx}>{quantity}</option>
        )
    }); //[0,0,0,0]
    const changeQuantity = (event: React.ChangeEvent<HTMLSelectElement> )=>{
        const quantity = +event.target.value
        changeQuantityHandler(id, quantity)
    }
    const remove = ()=>{
        removeItem(id);
    }
    return (
        <div className={cartItem}>
            <div className={product}>
                    <div className={productImg}>
                        <img
                            src={img}
                            alt={title}
                        />
                    </div>
                    <div className={productInfo}>
                        <h2>{title}</h2>
                        <h3 className="fs-6">{cat_prefix} products</h3>
                        <h3 className="fs-6">Price: <Badge bg="" className={customBadge}>{price.toFixed(2)} $</Badge></h3>
                        <h3 className="fs-6">Total price: <Badge bg="" className={customBadge}>{quantity && (price * quantity).toFixed(2)} $</Badge></h3>
                    </div>
            </div>

            <div className={cartItemSelection}>
                <div className="text-center">
                    <span>Quantity</span>
                    <Form.Select onChange={changeQuantity} value={quantity} aria-label="Default select example">
                        {renderOption}
                    </Form.Select>
                </div>
                <Button
                    className={styles.customButton}
                    variant=""
                    onClick={remove}
                >
                    Remove
                </Button>
            </div>
        </div>
    );
});

export default CartItem;