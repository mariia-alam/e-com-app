import { memo } from "react";
import styles from "./styles.module.css";
import { Tproducts } from "@customtypes";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import {LikeButton} from "@components/eCommerce";
import AddToCartButton from "../ShoppingCart/AddToCartButton/AddToCartButton";

const { product, productImg } = styles;

const Product = memo( ({ cat_prefix, title, img, price, id, max , quantity, isLiked, isAuthenticated}: Tproducts ) => {

    const props = {cat_prefix, title,img,price,id,max,quantity,isLiked,isAuthenticated}

    const productVariants = {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };


    const currentRemainingQuantity =( max ?? 0) - (quantity ?? 0);
    const quantityReachedToMax = currentRemainingQuantity <=0 ? true : false;


return (
    <>
        <motion.div
            key={id}
            variants={productVariants}
            whileHover={{
                scale: 1.09,
                transition: { duration: 0.5, ease: "easeInOut" }
            }}
            className={product}
            >
                {/* Like Button */}
                <LikeButton product={props} />

                {/* Product Image */}
                <div className={productImg}>
                    <NavLink   to={`/product/${id}`}  state={{ from: location.pathname }}>
                    <img  loading="lazy" src={img[0]} alt={title} />
                    </NavLink>
                </div>

                {/* Product Details */}
                <h3 className="text-primary">${price.toFixed(2)}</h3>
                <h3>{quantityReachedToMax ? <p className="text-danger">maximum limit Reached</p> : <p>You can add {currentRemainingQuantity} items</p>}</h3>

                {/* Add to Cart Button */}
                <AddToCartButton
                    productId={id}
                    isAuthenticated={isAuthenticated || false}
                    isDisabled={quantityReachedToMax}
                />

        </motion.div>
        </>
    );
})

export default Product;
