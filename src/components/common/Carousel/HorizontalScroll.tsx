import { Tproducts } from "@customtypes";
import { useAppSelector } from "@store/hooks";
import { motion } from "framer-motion";
import { Button } from "react-bootstrap";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {LikeButton} from "@components/eCommerce";

type TScrollProps = {
    products: Tproducts[];
    imgHeight: string;
    prefix:string;
};

const HorizontalScroll = ({ products, imgHeight, prefix }: TScrollProps) => {


    const {error} = useAppSelector(state=> state.products)
    const navigate = useNavigate();
    const handleMouseEnter = (e: React.MouseEvent<HTMLImageElement>) => {
        const hoverSrc = e.currentTarget.getAttribute("data-hover");
        if (hoverSrc) e.currentTarget.src = hoverSrc;
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLImageElement>) => {
        const originalSrc = e.currentTarget.getAttribute("data-original");
        if (originalSrc) e.currentTarget.src = originalSrc;
    };

      //impact of touch on mobile
    const handleTouchStart = (e: React.TouchEvent<HTMLImageElement>, index: number) => {
        const hoverSrc = products[index].img[1];
        if (hoverSrc) e.currentTarget.src = hoverSrc;
    };

    const handleTouchEnd = (e: React.TouchEvent<HTMLImageElement>, index: number) => {
        const originalSrc = products[index].img[0];
        if (originalSrc) e.currentTarget.src = originalSrc;
    };



if(error) {
    return(
    <p className="text-danger">Can not load products. Something went wrong </p>
    );
}
    return (
        <div
        style={{
            overflowX: "auto",
            whiteSpace: "nowrap",
            width: "100%",
            scrollbarWidth: "none",
        }}
        >
        <motion.div
            initial={{ opacity: 0, x: 200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}

            drag="x"
            dragConstraints={{ left: -((products.length - 3) * 400), right: 0 }}
            style={{
            display: "flex",
            justifyContent:"center",
            alignItems:"center",
            gap: "0px",
            cursor: "pointer",
            width: "max-content",
            }}
        >
            {products.map((item, index) => {
            return(
            <motion.div
                key={index}
                style={{
                position: "relative",
                height: imgHeight,
                width: "300px",
                }}
            >
                <div
                style={{
                    position: "absolute",
                    top: "10px",
                    right: "50px",
                    zIndex: 10,
                }}
                >
                    <p className="text-decoration-underline text-primary fw-light">${item.price.toFixed(2)}</p>
                </div>

                {/* Like Button */}
                <LikeButton product={item} />

                <img
                src={item.img[0]}
                alt={`Product ${index}`}
                loading="lazy"
                className="img-fluid"
                style={{
                    height: imgHeight,
                    width: "100%",
                    objectFit: "cover",
                }}
                data-original={item.img[0]}
                data-hover={item.img[1] || item.img[0]}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onTouchStart={(e) => handleTouchStart(e, index)}
                onTouchEnd={(e) => handleTouchEnd(e, index)}
                onDoubleClick={()=>navigate(`/product/${item.id}`)}
                />
            </motion.div>
        )})}
            <Button
            onClick={()=>navigate(`categories/products/${prefix}`)}
                style={{ marginLeft: "20px" }}
                variant="outline-dark"
                className="flex items-center gap-2"
                >
                more
                <motion.div
                    animate={{
                    x: [0, 5, 0],
                    }}
                    transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    }}
                    style={{display:"inline-block"}}
                >
                    <MdKeyboardDoubleArrowRight size={24} />
                </motion.div>
                </Button>
        </motion.div>
        </div>
    );
};
export default HorizontalScroll;