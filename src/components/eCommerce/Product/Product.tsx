import { Button } from "react-bootstrap";
import styles from "./styles.module.css";
import { Tproducts } from "@customtypes/products";
const { product, productImg , customButton } = styles;

const Product = ({title, img, cat_prefix, price, id}: Tproducts) => {

    return (
        <div className={product}>
        <div className={productImg}>
            <img
            src={img}
            alt={title}
            />
        </div>
        <h2 title={title}>{title}</h2>
        <h3>{price}$</h3>
        <Button variant=""  className={customButton}>
            Add to cart
        </Button>
        </div>
    );
};

export default Product;