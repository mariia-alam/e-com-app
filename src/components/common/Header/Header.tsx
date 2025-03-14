import styles from "./styles.module.css";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";
import { Container, NavDropdown } from "react-bootstrap";
import {HeaderRightBar} from "@components/common";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import {logout} from "@store/auth/authSlice"
import { useEffect } from "react";
import { actGetWishList } from "@store/WishList/wishListSlice";

const {headerContainer, headerLogo , span } = styles

export default function Header() {

    const dispatch = useAppDispatch();

    const {accessToken,user} = useAppSelector(state=>state.auth)

    useEffect(()=>{
        if(accessToken){
        dispatch(actGetWishList("productsIds"));
        }
    },[dispatch, accessToken]);

    return (
        <header>
            <div className={headerContainer}>
                <h1 className={headerLogo}><span className={span}>SHOPPING</span></h1>
                <HeaderRightBar/>
            </div>
            <Navbar
            expand="lg"
            bg=""
            data-bs-theme="dark">
                    <Container>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mi-auto">
                            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                            <Nav.Link  as={NavLink} to="/categories">Categories</Nav.Link>
                            <Nav.Link as={NavLink} to="/about">About us</Nav.Link>
                        </Nav>
                        <Nav className="ms-auto">
                            {
                                accessToken ?
                                <>
                                    <NavDropdown title={`Welcome ${user?.firstName +" "+ user?.lastName}`} id="basic-nav-dropdown">
                                    <NavDropdown.Item as={NavLink} to="/profile" end  >Profile</NavDropdown.Item>
                                    <NavDropdown.Item as={NavLink} to="/profile/orders" >Orders</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as={NavLink} to="/" onClick={ () => dispatch( logout() ) }>
                                        Logout
                                    </NavDropdown.Item>
                                    </NavDropdown>
                                </> :
                                <>
                                    <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                                    <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
                                </>
                            }
                        </Nav>
                        </Navbar.Collapse>

                    </Container>
            </Navbar>
        </header>
)
}
