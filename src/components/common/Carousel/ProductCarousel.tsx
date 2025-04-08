import { Row, Col, Carousel } from "react-bootstrap";
import { motion } from "framer-motion";
import { useCallback } from "react";
import { Tproducts } from "@customtypes";
import { useNavigate } from "react-router-dom";

type TCarouselProps = {
    carouselHeight: string;
    imgHeight: string;
    products: Tproducts[];
};

const ProductCarousel = ({ carouselHeight, imgHeight, products }: TCarouselProps) => {

    const navigate = useNavigate();

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
                        interval={1000}
                        controls={true}
                        indicators={false}
                        wrap={true}
                        keyboard={true}
                        pause="hover"
                        fade
                        data-bs-theme="dark"
                    >
                        {products.map((item) => (
                            <Carousel.Item key={item.id} className="d-flex flex-row">
                                        <div
                                            key={item.id}
                                            className="d-flex flex-column align-items-center position-relative"
                                            style={{ flex: 1 }}
                                        >
                                            <div className="" style={{top:"10px", right:"160px" , zIndex:10, position:"absolute"}}>
                                                <p className="text-decoration-underline text-primary fw-medium">${item.price}</p>
                                            </div>
                                            <img
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

                                                onDoubleClick={() => navigate(`/product/${item.id}`)}
                                                src={item.img[0]}
                                                data-original={item.img[0]}
                                                data-hover={item.img[1] || item.img[0]}
                                                alt={`Slide ${item.id}`}
                                            />
                                        </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Col>
            </Row>
        </motion.div>
    );
};

export default ProductCarousel;
