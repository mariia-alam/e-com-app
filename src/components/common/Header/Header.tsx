import styles from "./styles.module.css";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";
import { Badge, Container } from "react-bootstrap";
import HeaderBasket from "../../eCommerce/HeaderBasket/HeaderBasket";
const {headerContainer, headerLogo, navBar, customBadge} = styles

export default function Header() {
    return (
        <header>
            <div className={headerContainer}>
                <h1 className={headerLogo}><span>our</span> <Badge bg="" className={customBadge}>e-com</Badge></h1>
                <HeaderBasket/>
            </div>
            <Navbar
            expand="lg"
            className={navBar}
            bg=""
            data-bs-theme="dark">
                    <Container>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mi-auto">
                            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                            <Nav.Link  as={NavLink} to="/categories">Categories</Nav.Link>
                            <Nav.Link  as={NavLink} to="/products/s">Products</Nav.Link>
                            <Nav.Link as={NavLink} to="/about">About us</Nav.Link>
                        </Nav>
                        <Nav className="ms-auto">
                            <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                            <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
                        </Nav>
                        </Navbar.Collapse>
                    </Container>
            </Navbar>
        </header>
)
}
