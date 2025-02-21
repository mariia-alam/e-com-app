import styles from "./styles.module.css";
const { category, categoryImg, categoryTitle } = styles;

const Category = () => {
    return (
        <div className={category}>
        <div className={categoryImg}>
            <img
src="https://static.vecteezy.com/system/resources/thumbnails/034/324/091/small/baby-wearing-white-shirt-bodysuit-mockup-at-gray-background-design-onesie-template-print-presentation-mock-up-ai-generated-free-photo.jpeg"            alt=""
            />
        </div>
        <h4 className={categoryTitle}>Title</h4>
        </div>
    );
};

export default Category;