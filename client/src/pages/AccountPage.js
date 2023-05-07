import React, {useContext} from 'react';
import Container from "react-bootstrap/Container";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {SHOP_ROUTE} from "../utils/consts";

const AccountPage = () => {

    const {user} = useContext(Context)

    let nav = useNavigate()
    const logOut = async () => {
        user.setUser({})
        user.setAuth(false)
        nav(SHOP_ROUTE)
    }
    return (
        <Container className='container-shop'>

            <div className='d-flex mb-2'> <b>email:ㅤ</b>{user.user.email}</div>
            <button onClick={logOut}>Выйти</button>
        </Container>
    );
};

export default AccountPage;