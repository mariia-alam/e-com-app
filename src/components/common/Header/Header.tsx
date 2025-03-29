import styles from "./styles.module.css";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from "react-router-dom";
import { Container, NavDropdown, Offcanvas } from "react-bootstrap";
import {HeaderRightBar} from "@components/common";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import {logout} from "@store/auth/authSlice"
import { useEffect } from "react";
import { actGetWishList } from "@store/WishList/wishListSlice";
import { actGetCart } from "@store/Cart/cartSlice";

const {headerContainer, headerLogo , span } = styles

export default function Header() {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {accessToken,user} = useAppSelector(state=>state.auth)

    useEffect(()=>{
        if(accessToken){
        dispatch(actGetWishList("productsIds"));
        dispatch(actGetCart());;
        }
    },[dispatch, accessToken]);

    return (
        <header>
            <div className={headerContainer}>
                <h1 className={headerLogo}><span className={span}>Fashion Hub</span></h1>
                <HeaderRightBar/>
            </div>
            <Navbar
            expand="lg"
            bg=""
            data-bs-theme="dark">
                    <Container fluid>
                        <Navbar.Toggle aria-controls="offcanvasNavbar" />
                        <Navbar.Offcanvas  aria-labelledby="offcanvasNavbarLabel" id="offcanvasNavbar" placement="start">
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Menu</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body className="justify-content-between">
                            <Nav>
                                <Nav.Link as={NavLink} to="/" data-bs-dismiss="#offcanvas" >Home</Nav.Link>
                                <Nav.Link as={NavLink} to="/categories">Categories</Nav.Link>
                                <Nav.Link as={NavLink} to="/about">About us</Nav.Link>
                            </Nav>
                            <Nav>
                                {accessToken ? (
                                    <NavDropdown title={`Welcome ${user?.firstName} ${user?.lastName}`} id="basic-nav-dropdown">
                                        <NavDropdown.Item end as={NavLink} to="/profile">Account Info</NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} to="/orders">My Orders</NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} to="/wishlist">My Wishlist</NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} to="/cart">My Cart</NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} to="/reviews">My Reviews</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item  onClick={() => {dispatch(logout()); navigate("/")}}>
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                ) : (
                                    <>
                                        <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                                        <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
                                    </>
                                )}
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>

                    </Container>
            </Navbar>
        </header>
)
}
