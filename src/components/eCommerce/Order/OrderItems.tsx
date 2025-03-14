import { Badge } from "react-bootstrap";
import styles from "./styles.module.css";
import { Tproducts } from "@customtypes";
import { memo } from "react";

const { orderItem, product, productImg, productInfo, customBadge } = styles;

const OrderItems = memo( ({title , img, price , cat_prefix , quantity }: Tproducts) => {


    return (
        <div className={orderItem}>
            <div className={product}>
                    <div className={productImg}>
                        <img
                            src={img}
                            alt={title}
                        />
                    </div>
                    <div className={productInfo}>
                        <h2>{title} ({quantity})</h2>
                        <h3 className="fs-6">{cat_prefix} products</h3>
                        <h3 className="fs-6">Price: <Badge bg="" className={customBadge}>{price.toFixed(2)} $</Badge></h3>
                        <h3 className="fs-6">Total price: <Badge bg="" className={customBadge}>{quantity && (price * quantity).toFixed(2)} $</Badge></h3>
                    </div>
            </div>
        </div>
    );
});

export default OrderItems;