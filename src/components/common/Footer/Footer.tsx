import { Row, Col, Button } from 'react-bootstrap';
import { FaApple, FaGooglePlay } from 'react-icons/fa';


export default function Footer() {
    return (
        <div style={{ color:"white", backgroundColor:"var(--accent-color)"}} className='p-3'>
            <Row>
                <Col className="text-center">
                    <p >&copy; 2025 Fashion Hub | All rights reserved</p>
                    <p>
                    <a href="/privacy-policy" className="text-white">Privacy Policy</a> | 
                    <a href="/terms-of-service" className="text-white">Terms of Service</a>
                    </p>
                </Col>
            </Row>


            <Row className="p-2">
                <Col className="text-center">
                    <h2 className="fw-bold">Stay Updated with Our Latest Offers</h2>
                    <p>Subscribe to our newsletter and get exclusive discounts and fashion tips.</p>
                    <input
                    type="email"
                    className="form-control w-50 mx-auto"
                    placeholder="Enter your email"
                    />
                    <Button className="btn btn-light mt-3">Subscribe</Button>
                </Col>
            </Row>

             {/* App Download Section */}
            <Row className="p-4 text-center">
                <Col>
                    <h2 className="fw-bold">Download Our App</h2>
                    <p>Get the best shopping experience on your phone.</p>
                    <div className="d-flex justify-content-center gap-3 mt-3">
                        <a href="#" className="btn btn-dark d-flex align-items-center p-2" >
                            <FaApple size={24} className="me-2" /> Download on the App Store
                        </a>
                        <a href="#" className="btn btn-dark d-flex align-items-center p-2">
                            <FaGooglePlay size={24} className="me-2" /> Get it on Google Play
                        </a>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
