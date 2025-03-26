import { Row, Col , Carousel  } from "react-bootstrap";
import {motion} from "framer-motion"
import { useMemo, useCallback } from "react";

const images = [
    "/carouselImages/product1.webp",
    "/carouselImages/product2.webp",
    "/carouselImages/product3.webp",

    "/carouselImages/product4.webp",
    "/carouselImages/product5.webp",
    "/carouselImages/product6.webp",

    "/carouselImages/product7.webp",
    "/carouselImages/product8.webp",
    "/carouselImages/product9.webp",

    "/carouselImages/product10.webp",
    "/carouselImages/product11.webp",
    "/carouselImages/product12.webp",
];

    const hoverImages = [
    "/carouselImages/productHover1.webp",
    "/carouselImages/productHover2.webp",
    "/carouselImages/productHover3.webp",

    "/carouselImages/productHover4.webp",
    "/carouselImages/productHover5.webp",
    "/carouselImages/productHover6.webp",

    "/carouselImages/productHover7.webp",
    "/carouselImages/productHover8.webp",
    "/carouselImages/productHover9.webp",

    "/carouselImages/productHover10.webp",
    "/carouselImages/productHover11.webp",
    "/carouselImages/productHover12.webp",
];


type TCarouselProps= {
    itemsNumber: number;
    carouselHeight:string;
    imgHeight:string;
}

const ProductCarousel = ({itemsNumber, carouselHeight, imgHeight}:TCarouselProps) => {

    //Avoid division by zero
    const validItemsNumber = Math.max(itemsNumber, 1);

    const groupedImages = useMemo(() => {
        const result = [];
        for (let i = 0; i < images.length; i += validItemsNumber) {
            result.push(images.slice(i, i + validItemsNumber));
        }
        return result;
    }, [validItemsNumber]);


    const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLImageElement>) => {
        const hoverSrc = e.currentTarget.getAttribute("data-hover");
        if (hoverSrc) e.currentTarget.src = hoverSrc;
    }, []);

    const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLImageElement>) => {
        const originalSrc = e.currentTarget.getAttribute("data-original");
        if (originalSrc) e.currentTarget.src = originalSrc;
    }, []);


return(
    <motion.div
            initial={{ opacity: 0, x: 200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease:"easeInOut" }}
    >
        <Row>
        <Col md={12}>
            <Carousel
                className="d-flex justify-content-center align-items-center"
                style={{ width: "100%", height: `${carouselHeight}` }}
                interval={2000}
                controls={true}
                indicators={false}
                wrap={true}
                keyboard={true}
                pause="hover"
                fade data-bs-theme="dark">

            {groupedImages.map((group, groupIndex) => (
                <Carousel.Item key={groupIndex} className="d-flex flex-row">
                {group.map((image, index) =>
                {
                const absoluteIndex = index + groupIndex * itemsNumber;
                return (
                    <motion.div
                        key={absoluteIndex}
                        className="d-flex flex-column align-items-center"
                        style={{ flex: 1 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                    <motion.img
                        loading="lazy"
                        className="img-fluid"
                        style={{ maxHeight: `${imgHeight}`, objectFit: "cover", borderRadius:"10px" }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        src={image}
                        data-original={image}
                        data-hover={hoverImages[absoluteIndex] || image}
                        alt={`Slide ${absoluteIndex}`}
                        whileHover={{ scale: 1.05, transition:{duration:1} }}
                    />
                    </motion.div>
                )
                }
                )}
                </Carousel.Item>
            ))}
            </Carousel>
        </Col>
        </Row>
    </motion.div>
);}

export default ProductCarousel