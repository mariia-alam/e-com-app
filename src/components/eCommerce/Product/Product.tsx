import { Button } from "react-bootstrap";
import styles from "./styles.module.css";
const { product, productImg , customButton } = styles;

const Product = () => {
    return (
        <div className={product}>
        <div className={productImg}>
            <img
            src="https://cdn-eu.dynamicyield.com/api/9876644/images/244c68ad42d8b__hp-w12-22032022-h_m-women_shirts-blouses.jpg"
            alt=""
            />
        </div>
        <h2>Title</h2>
        <h3>10 $</h3>
        <Button variant=""  className={customButton}>
            Add to cart
        </Button>
        </div>
    );
};

export default Product;