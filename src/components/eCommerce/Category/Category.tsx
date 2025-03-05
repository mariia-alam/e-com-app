import { Tcategory } from "@customtypes";
import styles from "./styles.module.css";
const { category, categoryImg, categoryTitle } = styles;
import { Link } from "react-router-dom";


const Category = ({title, img, prefix}: Tcategory) => {
    // console.log("render category component")

    return (
        <div
            className={category}        >
                <Link to={`/categories/products/${prefix}`}>
                    <div className={categoryImg}>
                        <img
                            src={img}  alt=""
                        />
                    </div>
                    <h4 className={categoryTitle}>{title}</h4>
                </Link>
        </div>
    );
};

export default Category;