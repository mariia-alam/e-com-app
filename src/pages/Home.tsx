import { Container, Row, Col, Accordion, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { Footer, MotionButton } from "@components/common";
import HorizontalScroll from "@components/common/Carousel/HorizontalScroll"
import {ProductCarousel} from "@components/common";
import { PersonFill, CartFill, HeartFill } from 'react-bootstrap-icons';
import useHome from "@hooks/useHome";


export default function Home() {
  const {
          first10Men,
          first10Women,
          isSmallScreen,
          isMedScreen,
          token,
          navigate
        }  = useHome();

  return (
    <Container  fluid className="p-0 d-flex flex-column overflow-hidden">
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
          height: `${isSmallScreen ? "47vh" : "85vh"}`,
          minHeight: "300px",
          backgroundImage:`linear-gradient(rgba(210, 197, 197, 0.5), rgba(255, 126, 103, 0.8)),
              url('/homeModels/model1.jpg'),
              url('/homeModels/model2.jpg'),
              url('/homeModels/model3.jpg')
            `,
          backgroundSize: `${isSmallScreen ? "100% ,50% 100%, 50% 100%, 50% 100%"  : isMedScreen ?  "100%, 50% 110%, 50% 110%, 50% 110%" : "100% 100%, 50% 150%, 50% 150%, 50% 150%"}`,
          backgroundPosition:"top left, top center,  top right",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "multiply",
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
                // onClick={() => navigate("/categories")}
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
  (<div className="py-4">
        <h2 className="text-center fw-bold">Discover Our Latest Collection</h2>
        <p className="text-center text-muted">Shop the newest exclusive products</p>
      <ProductCarousel products={first10Men}  carouselHeight="40vh" imgHeight="35vh"/>
        <h2 className="text-center mt-5 fw-bold">Weekly Deals</h2>
        <p className="text-center text-muted">Get these discounts before they're gone!</p>
      <ProductCarousel products={first10Women}  carouselHeight="40vh" imgHeight="35vh"/>
  </div>
    ):(
      <div className="py-5 text-center">
        <h2 className="fw-bold fs-1">Discover Our Latest Collection</h2>
        <p className="text-muted fs-4">Shop the newest exclusive products</p>
        <p className="mb-5 fw-lighter fs-6">Double click image to see more..</p>
        <HorizontalScroll prefix="men" products={first10Men} imgHeight="400px" ></HorizontalScroll>
        <h2 className="mt-5 fw-bold fs-1">Weekly Deals</h2>
        <p className=" text-muted mb-5 fs-4">Get these discounts before they're gone!</p>
        <HorizontalScroll prefix="women" products={first10Women} imgHeight="400px"></HorizontalScroll>
      </div>
    )
}

{/* Accordion */}

<motion.div
  initial={{ opacity: 0, scaleX: 0 }}
  whileInView={{ opacity: 1, scaleX: 1 }}
  transition={{ duration: 1, ease: "easeOut" }}
>
  <Row className="py-5 mb-5 m-auto">
    <Col md={9} sm={12} className="mx-auto">
      <h2 className="fw-bold text-center mb-4" style={{ color: '#2c3e50' }}>
        Frequently Asked Questions
      </h2>
      <Accordion defaultActiveKey="0" flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header className="text-dark border-0 p-3 rounded-3">
            <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>What is Fashion Hub?</span>
          </Accordion.Header>
          <Accordion.Body className="p-3">
            Fashion Hub is an online store that offers a wide variety of fashion trends, from clothing to accessories, for everyone.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header className="text-dark border-0 p-3 rounded-3">
            <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>How do I shop?</span>
          </Accordion.Header>
          <Accordion.Body className="p-3">
            Simply log in to your account, browse our collections, add items to your cart, and proceed to checkout to complete your order.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header className="text-dark border-0 p-3 rounded-3">
            <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>What payment methods do you accept?</span>
          </Accordion.Header>
          <Accordion.Body className="p-3">
            We accept credit/debit cards, PayPal, and other secure payment options to make your shopping experience easy and safe.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Col>
  </Row>
</motion.div>





{/* CTA Section with Another Background Image */}

<motion.div
  initial={{ opacity: 0, scaleX: 0 }}
  whileInView={{ opacity: 1, scaleX: 1 }}
  transition={{ duration: 2, ease: "backOut" }}
>
  <Row
    className="text-center text-white py-5 position-relative"
    style={{
      height:"34vh",
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



  <motion.div
      className="mt-5"
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 2, ease: "backOut" }}
    >
      <Row className="py-5 text-center mb-5">
        <Col sm={12} md={4} className="d-flex flex-column align-items-center mb-4">
          <PersonFill className="fs-1 text-primary" />
          <h4 className="fw-bold mt-3">100K+ Visitors</h4>
          <p>Our website has over 100,000 visitors monthly</p>
        </Col>
        <Col sm={12} md={4} className="d-flex flex-column align-items-center mb-4">
          <CartFill className="fs-1 text-success" />
          <h4 className="fw-bold mt-3">50K+ Orders</h4>
          <p>Over 50,000 orders have been placed this year</p>
        </Col>
        <Col sm={12} md={4} className="d-flex flex-column align-items-center mb-4">
          <HeartFill className="fs-1 text-danger" />
          <h4 className="fw-bold mt-3">1M+ Likes</h4>
          <p>Our customers love our products!</p>
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
