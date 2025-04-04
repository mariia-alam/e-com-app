import { Row, Col, Card} from "react-bootstrap";
import { motion } from "framer-motion";
import {  FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import {Reviews} from "../components/common";


const InfoCard = ({ title, text, motionProps }: { title: string; text: string; motionProps?: object }) => {
  return (
    <Col md={6} className="mb-3 mb-md-0 text-center">
      <motion.div {...motionProps} className="h-100">
        <Card className="p-2 shadow h-100 w-75 m-auto">
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{text}</Card.Text>
          </Card.Body>
        </Card>
      </motion.div>
    </Col>
  );
};


const About = () => {

  console.log("about")


  return (
    <div className="overflow-hidden mt-5">
      <div className="w-75 m-auto">
      <motion.div
      className="text-center mb-5 w-75 m-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>About Us</h1>
        <p className="fs-5 ">
              We are a fashion e-commerce store dedicated to providing high-quality, trendy, and unique designs for everyone.
        </p>
      </motion.div>


      {/* Story & Vision */}
    <Row className="mb-5">
          <InfoCard
            title="Our Story"
            text="Our journey started with a simple dream: to offer elegant and practical fashion with exceptional quality. Since then, we've been committed to providing the best products to our customers."
            motionProps={{ initial: { opacity: 0, x: -200 }, whileInView: { opacity: 1, x: 0 }, transition: { duration: 1, ease: "easeOut" } }}
          />
        <InfoCard
          title="Our Vision"
          text="We aspire to be the leading fashion brand, offering innovative products that cater to our customers' needs."
          motionProps={{ initial: { opacity: 0, x: 200 }, whileInView: { opacity: 1, x: 0 }, transition: { duration: 1, ease: "easeOut"} }}
        />
    </Row>

{/* Quality & Materials */}
      <motion.div
        className="text-center mb-5 w-75 m-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2>Quality & Materials</h2>
        <p className="fs-5">We use the finest sustainable materials to ensure comfort and elegance in every piece of clothing.</p>
      </motion.div>

{/* Shipping & Customer Service */}
      <Row className="mb-5">
        <InfoCard
        title="Fast Shipping"
        text="We provide fast shipping to all regions with easy order tracking."
        motionProps={{ initial: { opacity: 0, x: -200 }, whileInView: { opacity: 1, x: 0 }, transition: { duration: 1, ease: "easeOut" } }}

        />
        <InfoCard
        title="Customer Support"
        text="Our team is always available to assist you with any inquiries or issues."
        motionProps={{ initial: { opacity: 0, x: 200 }, whileInView: { opacity: 1, x: 0 }, transition: { duration: 1, ease: "easeOut" } }}
        />
      </Row>

{/* reviews and rating */}
    <motion.div
    initial= {{ opacity: 0,y: 100 }}
    whileInView= {{ opacity: 1, y: 0 }}
    transition= {{ duration: 1, ease: "easeOut"}}
    className="text-center mb-5">
      <Reviews/>
    </motion.div>
</div>

      {/* Contact Us */}
      <motion.div
      style={{backgroundColor:"var(--accent-color)"}}
        className="text-center mt-5 rounded-1 py-3 text-white"
        initial={{ opacity: 0 , y: 100 }}
        whileInView={{ opacity: 1, y:0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
      <h3>Contact Us</h3>

      <p>
        <span className="fw-bold">Email: </span>
        <a style={{ color: "#E2E8F0" }} href="mailto:support@fashionstore.com" className="text-decoration-none">
          support@fashionstore.com
        </a>
      </p>

      <p>
        <span className="fw-bold">Phone: </span>
        <a style={{ color: "#E2E8F0" }} href="tel:+1234567890" className="text-decoration-none">
          +1 234 567 890
        </a>
      </p>

      <p>
        <span className="fw-bold">Address: </span>
        <a
          style={{ color: "#E2E8F0" }}
          href="https://www.google.com/maps?q=123+Fashion+Street,+New+York,+NY"
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-none"
        >
          123 Fashion Street, New York, NY
        </a>
      </p>


        <p>Follow us on social media or reach out via email.</p>
        <div className="d-flex justify-content-center gap-3 mb-3">
          <FaFacebook  size={30} style={{ cursor: "pointer", color: "#1877F2" }} />
          <FaTwitter  size={30} style={{ cursor: "pointer", color: "#1DA1F2" }} />
          <FaInstagram  size={30} style={{ cursor: "pointer", color: "#E4405F"  }} />
        </div>
      </motion.div>

    </div>
  );
};

export default About;