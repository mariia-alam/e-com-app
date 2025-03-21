import { Tcategory } from "@customtypes";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const { category, categoryImg, categoryTitle } = styles;

const Category = ({title, img, prefix}: Tcategory) => {

    const categoryVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale:1, transition: { duration: 0.4 } },
};

    return (
        <motion.div
            variants={categoryVariants}
            whileHover={{
                scale: 1.07,
                transition: { duration: 0.5, ease: "easeInOut" }
            }}
            whileTap={{ scale: [1 , 0.8 , 1], transition: { duration: 0.2 }  }}
            className={category}
        >
                <Link to={`/categories/products/${prefix}`}>
                    <motion.div
                        className={categoryImg}
                        whileHover={{
                            y: -5,
                            boxShadow: "0px 5px 10px rgba(0,0,0,0.2)",
                            transition: { duration: 0.3, ease: "easeInOut" }
                        }}
                    >
                        <img src={img} alt={title} />
                    </motion.div>
                    <h4 className={categoryTitle}>{title}</h4>
                </Link>
        </motion.div>
    );
};

export default Category;