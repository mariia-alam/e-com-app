import { Row, Col, Carousel } from "react-bootstrap";
import { motion } from "framer-motion";
import { useMemo, useCallback } from "react";

type TCarouselProps = {
    itemsNumber: number;
    carouselHeight: string;
    imgHeight: string;
    images: string[];
    hoverImages: string[];
};

const ProductCarousel = ({ itemsNumber, carouselHeight, imgHeight, images, hoverImages }: TCarouselProps) => {

    const validItemsNumber = Math.max(itemsNumber, 1);

    const groupedImages = useMemo(() => {
        const result = [];
        for (let i = 0; i < images.length; i += validItemsNumber) {
            result.push(images.slice(i, i + validItemsNumber));
        }
        return result;
    }, [validItemsNumber, images]);

    const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLImageElement>) => {
        const hoverSrc = e.currentTarget.getAttribute("data-hover");
        if (hoverSrc) e.currentTarget.src = hoverSrc;
    }, []);

    const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLImageElement>) => {
        const originalSrc = e.currentTarget.getAttribute("data-original");
        if (originalSrc) e.currentTarget.src = originalSrc;
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, x: 200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
        >
            <Row>
                <Col md={12}>
                    <Carousel
                        className="d-flex justify-content-center align-items-center"
                        style={{ width: "100%", height: carouselHeight }}
                        interval={null}
                        controls={true}
                        indicators={false}
                        wrap={true}
                        keyboard={true}
                        pause="hover"
                        fade
                        data-bs-theme="dark"
                    >
                        {groupedImages.map((group, groupIndex) => (
                            <Carousel.Item key={groupIndex} className="d-flex flex-row">
                                {group.map((image, index) => {
                                    const absoluteIndex = index + groupIndex * itemsNumber;
                                    return (
                                        <div
                                            key={absoluteIndex}
                                            className="d-flex flex-column align-items-center position-relative"
                                            style={{ flex: 1 }}
                                        >
                                            <div className="" style={{top:"10px", right:"160px" , zIndex:10, position:"absolute"}}>
                                                <p className="text-decoration-underline text-primary fw-medium">$ 30</p>
                                            </div>
                                            <motion.img
                                                loading="lazy"
                                                className="img-fluid"
                                                style={{ height: imgHeight, minHeight:"250px", objectFit: "cover"}}
                                                onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave}

                                                onTouchStart={(e) => {
                                                const hoverSrc = e.currentTarget.getAttribute("data-hover");
                                                if (hoverSrc) e.currentTarget.src = hoverSrc;
                                                }}

                                                onTouchEnd={(e) => {
                                                const originalSrc = e.currentTarget.getAttribute("data-original");
                                                if (originalSrc) e.currentTarget.src = originalSrc;
                                                }}

                                                // onDoubleClick={() => navigate(`/product/${productId}`)}
                                                src={image}
                                                data-original={image}
                                                data-hover={hoverImages[absoluteIndex] || image}
                                                alt={`Slide ${absoluteIndex}`}
                                                whileHover={{ scale: 1.05, transition: { duration: 1 } }}
                                            />
                                        </div>
                                    );
                                })}
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Col>
            </Row>
        </motion.div>
    );
};

export default ProductCarousel;
