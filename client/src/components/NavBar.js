import React, {useContext} from 'react';
import {Context} from "../index";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavLink} from "react-router-dom";
import {BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import "../styles/NavBar.css"
import {observer} from "mobx-react-lite";
import {Image} from "react-bootstrap";
import logo from '../res/лого_тем.png'


const NavBar = observer(() => {
    const {user}= useContext(Context)
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">

            <Container>
                <Image className='image' src={logo}></Image>
                <NavLink className='brand' to={SHOP_ROUTE}>Гефест</NavLink>
                <div className='slogan'>создавай божественно</div>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                {user.Auth ?
                        (<Nav className='href-container'>
                            <NavLink className='href' to={BASKET_ROUTE}>Корзина</NavLink>
                            <NavLink className='href' to='#login'>Личный кабинет</NavLink>
                        </Nav>)
                    :
                        (<Nav className='href-container'>
                            <NavLink className='href' to = {LOGIN_ROUTE} onClick={()=> user.setAuth(true)}>Авторизация</NavLink>
                        </Nav>)
                }
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
});

export default NavBar;