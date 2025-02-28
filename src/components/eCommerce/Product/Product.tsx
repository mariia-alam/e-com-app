import { useState, useEffect, memo } from "react";
import { Button, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
import { Tproducts } from "@customtypes/products";
import { useAppDispatch } from "@store/hooks";
import { addToCart } from "@store/Cart/cartSlice";


const { product, productImg, customButton } = styles;

const Product =memo( ({ title, img, price, id, max , quantity }: Tproducts) => {

    const currentRemainingQuantity = max - (quantity ?? 0);
    const quantityReachedToMax = currentRemainingQuantity <=0 ? true : false;

    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (loading) {
            timer = setTimeout(() => {
                dispatch(addToCart(id));
                setLoading(false);
            }, 500);
        }

        return () => clearTimeout(timer);
    }, [loading, dispatch, id]);

    const addToCartHandler = () => {
        setLoading(true);
    };
    console.log(typeof price)

    return (
        <div className={product}>
            <div className={productImg}>
                <img src={img} alt={title} />
            </div>
            <h2 title={title}>{title}</h2>
            <h3>{price.toFixed(2)} $</h3>
            <h3>{quantityReachedToMax ? <p className="text-danger">maximum limit Reached</p> : <p>You can add {currentRemainingQuantity} items</p>}</h3>
            <Button onClick={addToCartHandler} variant="" className={customButton} disabled={loading || quantityReachedToMax}>
                {loading ? <Spinner animation="border" size="sm" /> : "Add to cart"}
            </Button>
        </div>
    );
})

export default Product;
