import { useState, useEffect, memo } from "react";
import { Button, Spinner, Modal } from "react-bootstrap";
import styles from "./styles.module.css";
import { Tproducts } from "@customtypes";
import { useAppDispatch } from "@store/hooks";
import { addToCart } from "@store/Cart/cartSlice";
import Like from "@assets/svg/like-red.svg?react"
import LikeFill from "@assets/svg/like-fill-red.svg?react"
import actLikeToggle from "@store/WishList/act/actLikeToggle";

const { product, productImg, customButton } = styles;

const Product =memo( ({ title, img, price, id, max , quantity, isLiked, isAuthenticated}: Tproducts ) => {

    const [showModal, setShowModal] = useState(false);

    // console.log("render product component")

    const currentRemainingQuantity = max ?? 0 - (quantity ?? 0);
    const quantityReachedToMax = currentRemainingQuantity <=0 ? true : false;

    const dispatch = useAppDispatch();
    const [addLoading, setAddLoading] = useState(false);
    const [likeLoading, setLikeLoading] = useState(false);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (addLoading) {
            timer = setTimeout(() => {
                dispatch(addToCart(id));
                setAddLoading(false);
            }, 500);
        }

        return () => clearTimeout(timer);
    }, [addLoading, dispatch, id]);

    const addToCartHandler = () => {
        setAddLoading(true);
    };

    const LikeToggleHandler = ()=>{
        if(isAuthenticated){
        if(likeLoading){return}
        setLikeLoading(true);
        dispatch(actLikeToggle(id)).unwrap()
        .then(()=> setLikeLoading(false))
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

        <div className={product}>
                <div onClick={LikeToggleHandler}  className={styles.wishListBtn}>
                    {likeLoading ? (<Spinner animation="border" size="sm" />) :
                    isLiked ?
                        <LikeFill/> :
                        <Like/>
                    }
                </div>
            <div className={productImg}>
                <img src={img} alt={title} />
            </div>
            <h2 title={title}>{title}</h2>
            <h3>{price.toFixed(2)} $</h3>
            <h3>{quantityReachedToMax ? <p className="text-danger">maximum limit Reached</p> : <p>You can add {currentRemainingQuantity} items</p>}</h3>
            <Button onClick={addToCartHandler} variant="" className={customButton} disabled={addLoading || quantityReachedToMax}>
                {addLoading ? <Spinner animation="border" size="sm" /> : "Add to cart"}
            </Button>
        </div>
    </>
    );
})

export default Product;
