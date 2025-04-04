import { motion } from "framer-motion";
import { Button } from "react-bootstrap";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

type TScrollProps = {
    images: string[];
    hoverImages: string[];
    imgHeight: string;
};

const HorizontalScroll = ({ images, hoverImages, imgHeight }: TScrollProps) => {

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
        const hoverSrc = hoverImages[index];
        if (hoverSrc) e.currentTarget.src = hoverSrc;
    };

    const handleTouchEnd = (e: React.TouchEvent<HTMLImageElement>, index: number) => {
        const originalSrc = images[index];
        if (originalSrc) e.currentTarget.src = originalSrc;
    };


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
            dragConstraints={{ left: -((images.length - 3) * 400), right: 0 }}
            style={{
            display: "flex",
            justifyContent:"center",
            alignItems:"center",
            gap: "0px",
            cursor: "pointer",
            width: "max-content",
            }}
        >
            {images.map((image, index) => (
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
                    right: "10px",
                    zIndex: 10,
                }}
                >
                    <p className="text-decoration-underline text-primary fw-medium">$30</p>
                </div>
                <img
                src={image}
                alt={`Product ${index}`}
                loading="lazy"
                className="img-fluid"
                style={{
                    height: imgHeight,
                    width: "100%",
                    objectFit: "cover",
                }}
                data-original={image} //store origin image
                data-hover={hoverImages[index] || image} //store hover image
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onTouchStart={(e) => handleTouchStart(e, index)} //onTouch in mobile
                onTouchEnd={(e) => handleTouchEnd(e, index)} // OnTouch end
                // onDoubleClick={() => navigate(`/product/${productId}`)}
                />
            </motion.div>
            ))}
            <Button
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
