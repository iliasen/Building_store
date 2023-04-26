import React, {useContext} from 'react';
import {Context} from "../index";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {Link} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
//import {NavLink} from "react-bootstrap";
import {SHOP_ROUTE} from "../utils/consts";
import "../styles/NavBar.css"

const NavBar = () => {
    const {user}= useContext(Context)
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>
                    <Link className='brand' to={SHOP_ROUTE}>Гефест</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link><Link className='href' to='#F'>Features</Link></Nav.Link>
                        <Nav.Link><Link className='href' to='#p'>Prising</Link></Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link><Link className='href' to='basket'>Корзина</Link></Nav.Link>
                        <Nav.Link><Link className='href' to='#login'>Личный кабинет</Link></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;