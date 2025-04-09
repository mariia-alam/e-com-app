// components/LikeButton.tsx
import { motion } from "framer-motion";
import { Spinner } from "react-bootstrap";
import Like from "@assets/svg/like-red.svg?react";
import LikeFill from "@assets/svg/like-fill-red.svg?react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actLikeToggle } from "@store/WishList/wishListSlice";
import { Tproducts } from "@customtypes";
import { LoginModal } from "@components/common";
import { useState } from "react";

type LikeButtonProps = {
    product: Tproducts;
    };

const LikeButton = ({ product }: LikeButtonProps) => {

    const [showModal, setShowModal] = useState(false);

    const dispatch = useAppDispatch();
    const likeLoadingIds = useAppSelector((state) => state.wishlist.likeLoadingIds);
    const isThisProductLoading = likeLoadingIds.includes(product.id);

    const handleClick = () => {
        if (!product.isAuthenticated || isThisProductLoading){
            setShowModal(true);
        }else{
        dispatch(actLikeToggle(product.id));
        }
    };

    return (
        <>
        <LoginModal title="Login Required" body="You must be logged in to add this product to your wishlist" onClose={()=> setShowModal(false)} show={showModal}/>
        <motion.div
        whileTap={{ scale: 0.8, transition: { duration: 0.1 } }}
        whileHover={{ scale: 1.1 }}
        onClick={handleClick}
        style={{
            cursor:"pointer",
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 10,
        }}
        >
        {isThisProductLoading ? (
            <Spinner animation="border" size="sm" />
        ) : product.isLiked ? (
            <LikeFill width={20} height={20} />
        ) : (
            <Like width={20} height={20} />
        )}
        </motion.div>

        </>
    );
};

export default LikeButton;
