import React from "react";
import "../styles/Footer.css"
import {NavLink} from "react-router-dom";
import Container from "react-bootstrap/Container";
import {ABOUT_ROUTE, PAYMENT_ROUTE} from "../utils/consts";

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

                    <div>Интернет-магазин</div>
                    <div>7741 (МТС, Life, А1)</div>
                    <div>Для заявок:cc@mile.by</div>
                    <div>Прием звонков: c 8.00 до 22.00</div>

                    <div className="sub">
                        <NavLink to={ABOUT_ROUTE}>About us</NavLink>
                        <NavLink to={PAYMENT_ROUTE}>Способы оплаты</NavLink>
                    </div>
                    <div className='d-flex justify-content-between'>
                        Все прова защищены
                        <div>© 2023 OAO «Гефест»</div>
                    </div>
                </div>
            </Container>
        </div>
    );
};
