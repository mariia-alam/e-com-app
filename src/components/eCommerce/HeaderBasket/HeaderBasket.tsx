import styles from "./styles.module.css"
// import Logo from '@assets/svg/cart.svg?react';
// import Like from "@assets/svg/like.svg?react"
import { useAppSelector } from "@store/hooks";
import getCartTotalQuantitySelector from "@store/Cart/selectors";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const { basketContainer, basketQuantity} = styles;

export default function HeaderBasket() {
    const navigate = useNavigate();
    const totalQuantity = useAppSelector((state)=> getCartTotalQuantitySelector(state));

    return (
        <motion.div
            onClick={()=> navigate("/cart")}
            key={totalQuantity}
            className={basketContainer}
            animate={totalQuantity > 0 ? { scale: [1.4, 1.1] } : { scale: 1 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 100 }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="30" height="30">
                <path fill="#35495e" d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64l0 48-128 0 0-48zm-48 48l-64 0c-26.5 0-48 21.5-48 48L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-208c0-26.5-21.5-48-48-48l-64 0 0-48C336 50.1 285.9 0 224 0S112 50.1 112 112l0 48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"/>
            </svg>
{totalQuantity > 0 &&            <motion.div className={basketQuantity}>{totalQuantity}</motion.div>
}        </motion.div>
    )
}
