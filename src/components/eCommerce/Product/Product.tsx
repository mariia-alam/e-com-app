import { useState, useEffect, memo } from "react";
import { Button, Spinner, Modal } from "react-bootstrap";
import styles from "./styles.module.css";
import { Tproducts } from "@customtypes";
import { useAppDispatch } from "@store/hooks";
import Like from "@assets/svg/like-red.svg?react"
import LikeFill from "@assets/svg/like-fill-red.svg?react"
import actLikeToggle from "@store/WishList/act/actLikeToggle";
import actUpdateCart from "@store/Cart/act/actUpdateCart";
import { motion } from "framer-motion";
import { MotionButton } from "@components/common";

const { product, productImg, customButton } = styles;

const Product = memo( ({ title, img, price, id, max , quantity, isLiked, isAuthenticated}: Tproducts ) => {



const productVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale:1, transition: { duration: 0.4 } },
};

    const [showModal, setShowModal] = useState(false);

    const currentRemainingQuantity =( max ?? 0) - (quantity ?? 0);
    const quantityReachedToMax = currentRemainingQuantity <=0 ? true : false;

    const dispatch = useAppDispatch();
    const [addLoading, setAddLoading] = useState(false);
    const [likeLoading, setLikeLoading] = useState(false);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (addLoading) {
            timer = setTimeout(() => {

                dispatch(actUpdateCart({ productId:id , quantity:1 , actionType:"addItem"}))
                setAddLoading(false);
            }, 500);
        }

        return () => clearTimeout(timer);
    }, [addLoading, dispatch, id]);

    const addToCartHandler = () => {
        if (!isAuthenticated) {
            setShowModal(true);
        } else {
            setAddLoading(true);
        }

    };

    const LikeToggleHandler = ()=>{
        if(isAuthenticated){
        if(likeLoading){return}
        setLikeLoading(true);
        dispatch(actLikeToggle(id)).unwrap()
        .then(()=> {
            setLikeLoading(false);
        })
        .catch(()=> setLikeLoading(false))
        }else{
            setShowModal(true);
        }
    }

return (
    <>
        <Modal  centered show={showModal} onHide={ () => setShowModal(false) }>
            <Modal.Header closeButton>
            <Modal.Title>Login Required</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <p>If you want to continue, please log in</p>
            </Modal.Body>

            <Modal.Footer>
            <Button variant="" style={{backgroundColor:"var(--primary-color)", color:"white"}} onClick={()=> setShowModal(false)}>Close</Button>
            </Modal.Footer>
        </Modal>

        <motion.div
            layout
            key={id}
            variants={productVariants}
            whileHover={{
                scale: 1.09,
                transition: { duration: 0.5, ease: "easeInOut" }
            }}
            className={product}
            >
                {/* Like Button */}
                <motion.div
                    whileTap={{ scale: 0.8, transition: { duration: 0.1 } }}
                    whileHover={{ scale: 1.1 }}
                    onClick={LikeToggleHandler}
                    className={styles.wishListBtn}
                >
                    {likeLoading ? (<Spinner animation="border" size="sm" />) :
                    isLiked ?
                        <LikeFill/> :
                        <Like/>
                    }
                </motion.div>

                {/* Product Image */}
                <div className={productImg}>
                    <img src={img} alt={title} />
                </div>

                {/* Product Details */}
                <h2 title={title}>{title}</h2>
                <h3>${price.toFixed(2)}</h3>
                <h3>{quantityReachedToMax ? <p className="text-danger">maximum limit Reached</p> : <p>You can add {currentRemainingQuantity} items</p>}</h3>

                {/* Add to Cart Button */}
                <MotionButton
                    onClick={addToCartHandler}
                    variant=""
                    className={customButton}
                    disabled={addLoading || quantityReachedToMax}
                    whileTap={{ scale: [0.8,1] }}
                >
                    {addLoading ? <Spinner animation="border" size="sm" /> : "Add to cart"}
                </MotionButton>
        </motion.div>
        </>
    );
})

export default Product;
