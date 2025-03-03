import styles from "./styles.module.css"
import Like from "@assets/svg/like-black.svg?react"
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@store/hooks";

const { container , like, Quantity} = styles;

export default function HeaderWishList() {
    const navigate = useNavigate();
    const totalQuantity = useAppSelector((state)=> state.wishlist.itemsId.length);

    return (
        <motion.div
            onClick={()=> navigate("/wishlist")}
            key={totalQuantity}
            className={container}
            animate={totalQuantity > 0 ? { scale: [1.4, 1.1] } : { scale: 1 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 100 }}
        >
        <Like className={like}></Like>
            {totalQuantity > 0 && <motion.div className={Quantity}>{totalQuantity}</motion.div>}
        </motion.div>
    )
}
