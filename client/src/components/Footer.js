import React from "react";
import "../styles/Footer.css"
import {NavLink} from "react-router-dom";
import Container from "react-bootstrap/Container";

export const Footer = () => {
    return (
        <div className="footer">
            <Container>
                <div className="footer-content">
                    <h3 style={{
                            fontFamily: "Trebuchet MS",
                            fontSize: "2em"}}>
                        Гефест
                    </h3>
                    <p>Гефест зарегистрирован компанией под названием IlichBoss Pvt. Ltd.</p>
                    <div className="sub">
                        <NavLink to={'/'}>About us</NavLink>
                        <NavLink to={'/'}>Способы оплаты</NavLink>
                    </div>
                    <div className='d-flex justify-content-between'>
                        Все прова защищены
                        <div>© 2023 «Гефест»</div>
                    </div>
                </div>
            </Container>
        </div>
    );
};
