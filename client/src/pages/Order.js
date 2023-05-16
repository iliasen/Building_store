import React, {useContext} from 'react';
import {Container} from "react-bootstrap";
import {Context} from "../index";
import {NavLink, useLocation} from "react-router-dom";
import {BASKET_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";

const Order = observer( () => {
    const { basket } = useContext(Context)
    const {location} = useContext(Context)
    const local = useLocation();
    const {total, delivery} = local.state


    let finalPrice = total > 650 ? Math.round( total * 0.95)+delivery : total + delivery


    return (
        <Container className='container-shop'>
            <div className='d-flex mt-5'>
                <div>
                    <h2>Оформление заказа</h2>
                    населённый пункт {location.location}
                </div>

                <div className='order'>
                    <div className='d-flex justify-content-between'>
                        <h5>Заказ</h5>
                        <NavLink to={BASKET_ROUTE}>Изменить</NavLink>
                    </div>
                    <div>
                        {basket.basket_items.map((item) => (
                            <div key={item.id}>
                                {item.name}{item.quantity !==1 ? '('+item.quantity+' шт.)': null}<strong>{item.price * item.quantity}</strong>
                            </div>
                        ))}
                    </div>

                    <div>
                        <div>Доставка {delivery}</div>
                        <div>Итого {finalPrice}</div>
                    </div>
                </div>
            </div>
        </Container>
    );
});

export default Order;