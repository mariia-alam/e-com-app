// components/eCommerce/AddToCartButton.tsx
import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useAppDispatch } from "@store/hooks";
import actUpdateCart from "@store/Cart/act/actUpdateCart";
import { MotionButton, LoginModal } from "@components/common";

type AddToCartButtonProps = {
    productId: number;
    isAuthenticated: boolean;
    isDisabled?: boolean;
};

    const AddToCartButton = ({ productId, isAuthenticated, isDisabled = false }: AddToCartButtonProps) => {
    const dispatch = useAppDispatch();
    const [addLoading, setAddLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (addLoading) {
        timer = setTimeout(() => {
            dispatch(actUpdateCart({ productId, quantity: 1, actionType: "addItem" }));
            setAddLoading(false);
        }, 500);
        }
        return () => clearTimeout(timer);
    }, [addLoading, dispatch, productId]);

    const handleAddToCart = () => {
        if (!isAuthenticated) {
        setShowModal(true);
        } else {
        setAddLoading(true);
        }
    };

    return (
        <>
        <LoginModal
            title='Login Required'
            body='You must be logged in to add this product to your cart'
            onClose={()=> setShowModal(false)}
            show={showModal}
        />

        <MotionButton
            onClick={handleAddToCart}
            variant="outline-dark"
            disabled={addLoading || isDisabled}
            whileTap={{ scale: [0.8, 1] }}
        >
            {addLoading ? <Spinner animation="border" size="sm" /> : "Add to cart"}
        </MotionButton>
        </>
    );
};

export default AddToCartButton;
