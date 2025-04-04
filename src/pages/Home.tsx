import { Container, Row, Col, Accordion, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Footer, MotionButton } from "@components/common";
import {  useAppSelector } from "@store/hooks";
import { useState, useEffect } from "react";
import {ProductCarousel} from "@components/common";


export default function Home() {

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 576);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 576);
    };
        window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const token = useAppSelector(state => state.auth.accessToken);

  const navigate = useNavigate();

  return (
    <Container  fluid className="d-flex flex-column overflow-hidden">
      {/* Hero Section with Background Image */}
    <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease:"easeInOut" }}
      >
      <Row
        className="align-items-center text-center text-white"
        style={{
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)",
          margin: "auto",
          width: "100%",
          height: "30vw",
          minHeight: "300px",
          backgroundImage:`linear-gradient(rgba(210, 197, 197, 0.5), rgba(255, 126, 103, 0.8)),
              url('/homeModels/model1.jpg'),
              url('/homeModels/model2.jpg'),
              url('/homeModels/model3.jpg')
            `,
          backgroundSize: "100% 100% ,50%, 50% ,50% ",
          backgroundPosition: "top left, top center ,top right",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "multiply",
          borderRadius: "5px",
        }}
      >
        <Col md={12}>
        <motion.div
            className="d-flex flex-column gap-lg-3"
            initial={{opacity:0, y:100}}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
        >
          <h1 className= {`${isSmallScreen ? "fs-2 fw-bold fst-italic": "fs-1 fw-bold fst-italic"}`} >🛍️ Welcome to Fashion Hub!</h1>
          <p className={`${isSmallScreen ? "fs-5" : "fs-3"}`} >Discover the latest trends and shop your favorite styles today.</p>
          <div>
            {token ? (
              <MotionButton
                variant="light"
                style={{textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }}
                size="lg"
                onClick={() => navigate("/categories")}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                Explore more!
              </MotionButton>
            ) : (
              <MotionButton
                variant="light"
                style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)" }}
                size="lg"
                onClick={() => navigate("/login?message=home")}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                Log in and Shop Now!
              </MotionButton>
            )}
          </div>
        </motion.div>
        </Col>
      </Row>
    </motion.div>

{/* image carousel */}

{isSmallScreen ?
  (
      <ProductCarousel carouselHeight="40vh" imgHeight="30vh" itemsNumber={1}/>
  ):(
      <ProductCarousel carouselHeight="40vh" imgHeight="30vh" itemsNumber={3}/>
    )
}


{/* CTA Section with Another Background Image */}

<motion.div
  initial={{ opacity: 0, scaleX: 0 }}
  whileInView={{ opacity: 1, scaleX: 1 }}
  transition={{ duration: 2, ease: "backOut" }}
>
  <Row
    className="text-center text-white py-5 position-relative"
    style={{
      height:"30vh",
      borderRadius: "20px",
      overflow: "hidden",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)"
    }}
  >
    {/* background video */}
    <video
      autoPlay
      loop
      muted
      playsInline
      className="position-absolute w-100 h-100"
      style={{
        objectPosition:"100% 10%",
        objectFit: "cover",
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    >
      <source src="/homeModels/videoModel.mp4" type="video/mp4" />
    </video>

  <Col>
    <motion.div
      initial={{opacity:0, y:100}}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <h2 className= {`${isSmallScreen ? "fs-3 fw-bold fst-italic": "fs-2 fw-bold fst-italic"}`}>Upgrade Your Wardrobe Today!</h2>
      <p className={`${isSmallScreen ? "fs-5" : "fs-3"}`}>Browse our latest collection and stay ahead of fashion trends</p>
      <Button
          variant="light"
          size="lg"
          style={{ textShadow: "2px 2px 4px rgb(0, 0, 0, 0.2)"}}
      >
          Explore More
      </Button>
    </motion.div>
    </Col>
  </Row>
</motion.div>



{/* Accordion */}

<motion.div
    initial={{ opacity: 0, scaleX: 0 }}
    whileInView={{ opacity: 1, scaleX: 1 }}
    transition={{ duration: 2, ease:"backOut" }}
  >
  <Row className="py-5">
    <Col>
      <motion.h2
        animate={{ x: ["-5%", "5%", "-5%"] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="fw-bold text-center"
      >
        Frequently Asked Questions
      </motion.h2>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>What is Fashion Hub?</Accordion.Header>
          <Accordion.Body>
            Fashion Hub is an online store that offers a wide variety of fashion trends, from clothing to accessories, for everyone.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>How do I shop?</Accordion.Header>
          <Accordion.Body>
            Simply log in to your account, browse our collections, add items to your cart, and proceed to checkout to complete your order.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>What payment methods do you accept?</Accordion.Header>
          <Accordion.Body>
            We accept credit/debit cards, PayPal, and other secure payment options to make your shopping experience easy and safe.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Col>
  </Row>
</motion.div>

{/* footer */}
  <motion.div
    initial={{ opacity: 0, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, ease:"easeInOut" }}
  >
    <Footer/>
  </motion.div>

    </Container>
  );
}
