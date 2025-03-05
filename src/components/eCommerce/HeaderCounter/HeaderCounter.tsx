import styles from "./styles.module.css"
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const { container, quantity} = styles;

type HeaderCounterProps = {
    totalQuantity:number;
    svgIcon : React.ReactNode;
    page:string
}
export default function HeaderCounter({totalQuantity, svgIcon, page}: HeaderCounterProps) {
    const navigate = useNavigate();

    return (
        <motion.div
            onClick={()=> navigate(page)}
            key={totalQuantity}
            className={container}
            animate={totalQuantity > 0 ? { scale: [1.4, 1.1] } : { scale: 1 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 100 }}
        >
            {svgIcon}
            {totalQuantity > 0 && <motion.div className={quantity}>{totalQuantity}</motion.div>}
        </motion.div>
    )
}
