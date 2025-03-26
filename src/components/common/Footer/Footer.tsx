import { Row, Col, Container } from 'react-bootstrap';
import {motion} from "framer-motion"

export default function Footer() {
    return (
        <Container style={{borderRadius:"10px", color:"white", backgroundColor:"var(--accent-color)"}} className='p-3'>
            <Row>
                <Col className="text-center">
                    <p>&copy; 2025 Fashion Hub | All rights reserved</p>
                    <p>
                    <a href="/privacy-policy" className="text-white">Privacy Policy</a> | 
                    <a href="/terms-of-service" className="text-white">Terms of Service</a>
                    </p>
                </Col>
            </Row>


            <Row className="p-2">
                <Col className="text-center">
                    <motion.h2 className="fw-bold">Stay Updated with Our Latest Offers</motion.h2>
                    <motion.p>Subscribe to our newsletter and get exclusive discounts and fashion tips.</motion.p>
                    <motion.input
                    type="email"
                    className="form-control w-50 mx-auto"
                    placeholder="Enter your email"
                    />
                    <motion.button className="btn btn-light mt-3">Subscribe</motion.button>
                </Col>
            </Row>
        </Container>
    )
}
