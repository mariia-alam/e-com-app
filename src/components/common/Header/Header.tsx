import styles from "./styles.module.css";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from "react-router-dom";
import { Container, NavDropdown, Offcanvas } from "react-bootstrap";
import {HeaderRightBar} from "@components/common";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import {logout} from "@store/auth/authSlice"
import { useState, useEffect } from 'react';
import { actGetWishList } from "@store/WishList/wishListSlice";
import { actGetCart } from "@store/Cart/cartSlice";
import { actGetCategories } from "@store/categories/categoriesSlice";
import { useParams } from "react-router-dom";

const {headerContainer, headerLogo , span } = styles

export default function Header() {
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const handleShowOffcanvas = () => setShowOffcanvas(true);
    const handleCloseOffcanvas = () => setShowOffcanvas(false);

    const { prefix } = useParams();


    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {accessToken,user} = useAppSelector(state=>state.auth)
    const {records} = useAppSelector(state=>state.categories)

    const currentCategory = records.find(cat => cat.prefix === prefix);
    const dropdownTitle = currentCategory ? `Categories - ${currentCategory.title}` : "Categories";


    useEffect(()=>{
        if(accessToken){
        dispatch(actGetWishList("productsIds"));
        dispatch(actGetCart());
        }
        dispatch(actGetCategories());
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
                        <Navbar.Toggle onClick={handleShowOffcanvas} aria-controls="offcanvasNavbar" />
                        <Navbar.Offcanvas
                            aria-labelledby="offcanvasNavbarLabel"
                            id="offcanvasNavbar"
                            placement="start"
                            show={showOffcanvas}
                            onHide={handleCloseOffcanvas}
                            >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Menu</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body className="justify-content-between">
                            <Nav>
                                <Nav.Link as={NavLink} to="/" onClick={handleCloseOffcanvas} >Home</Nav.Link>
                                    <NavDropdown title={dropdownTitle} id="basic-nav-dropdown">
                                        {records.map((cat)=> <NavDropdown.Item onClick={handleCloseOffcanvas} key={cat.id} end as={NavLink} to={`/categories/products/${cat.prefix}`}>{cat.title}</NavDropdown.Item> )}
                                    </NavDropdown>
                                <Nav.Link as={NavLink} to="/about" onClick={handleCloseOffcanvas}>About</Nav.Link>
                            </Nav>
                            <Nav>
                                {accessToken ? (
                                    <NavDropdown title={`Welcome ${user?.firstName} ${user?.lastName}`} id="basic-nav-dropdown">
                                        <NavDropdown.Item end as={NavLink} to="/profile" onClick={handleCloseOffcanvas}>Account Info</NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} to="/orders" onClick={handleCloseOffcanvas}>My Orders</NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} to="/wishlist" onClick={handleCloseOffcanvas}>My Wishlist</NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} to="/cart" onClick={handleCloseOffcanvas}>My Cart</NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} to="/reviews" onClick={handleCloseOffcanvas}>My Reviews</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item  onClick={() => {dispatch(logout()); navigate("/"); setShowOffcanvas(false); }}>
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                ) : (
                                    <>
                                        <Nav.Link as={NavLink} to="/login" onClick={handleCloseOffcanvas}>Login</Nav.Link>
                                        <Nav.Link as={NavLink} to="/register" onClick={handleCloseOffcanvas}>Register</Nav.Link>
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
