import React, {useContext, useEffect} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import {Context} from "../index";
import {NavLink} from "react-router-dom";
import {BASKET_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";


import '../styles/Order.css'
import {getItems} from "../http/basketAPI";


const Order = observer( () => {
    const {user} = useContext(Context)
    const {location} = useContext(Context)


    const { basket } = useContext(Context)

    useEffect(()=> {
        getItems(user.user.id).then((items) => basket.setBasket_items(items))
    }, [basket.basket_items])


    const total = basket.basket_items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );


    let delivery = 50;
    if (location.location !== 'Минск' && location.location !== 'Колодищи' && location.location !== 'Озерище') {
        delivery += 50; }
    if (total > 1000) {
        delivery = 0;
    } else if (total > 500 && (location.location === 'Минск' || location.location === 'Озерище' || location.location === 'Колодищи')) {
        delivery = 0; }

    let finalPrice = total > 650 ? Math.round( total * 0.95)+delivery : total + delivery


    return (
        <Container className='container-shop'>
            <div className='orderContainer'>
                <div>
                    <div>
                        <h2>Оформление заказа</h2>
                        населённый пункт
                        <Form className='d-flex'>
                            <Form.Control style={{paddingLeft: 16, fontWeight: 500, color: '#000', width: 350}} type="text" placeholder='Введите ваш населённый пункт' defaultValue={location.location} onChange={(e) => location.setLocation(e.target.value)}/>
                            <input type='reset' className='resetLocationButton' value='x' onClick={() => location.setLocation('')}></input>
                        </Form>
                    </div>

                    <div className='deliveryAddress'>
                        <div>Доставка по адресу — {delivery === 0 ? 'бесплатно' : delivery +',00 руб'}, {location.location !== "Минск" && location.location !== "Колодищи" && location.location !== "Озерище" ? 'через 3 дня': 'через 1 день'}</div>
                        <span style={{color: '#999', fontSize: 13}}>Укажите как можно подробнее адрес доставки</span>
                        <form className='d-flex'>
                            <div className='addressInputs'>
                                <label>Улица</label>
                                <input className='Address' type='text'/>
                            </div>
                            <div className='addressInputs'>
                                <label>Дом</label>
                                <input className='House' />
                            </div>
                            <div className='addressInputs'>
                                <label>Корп.</label>
                                <input className='House' />
                            </div>
                        </form>
                        <form className='d-flex'>
                            <div className='addressInputs'>
                                <label>Под.</label>
                                <input className='House' />
                            </div>
                            <div className='addressInputs'>
                                <label>Этаж</label>
                                <input className='House' />
                            </div>
                            <div className='addressInputs'>
                                <label>Квартира</label>
                                <input className='Flat' />
                            </div>
                        </form>
                    </div>
                </div>

                <div className='order'>
                    <div className='d-flex justify-content-between'>
                        <h5>Заказ</h5>
                        <NavLink className='changeOrder' to={BASKET_ROUTE}>Изменить</NavLink>
                    </div>
                    <div>
                        {basket.basket_items.map((item) => (
                            <div className='itemsContainer'>
                                <div key={item.id} className='itemsFromBasket'>
                                    <div className='item-in-order'>
                                        {item.name}{item.quantity !==1 ? ' ('+item.quantity+' шт.)': null}
                                    </div>

                                    <div style={{fontSize: 16, lineHeight: 1.4}}>{item.price * item.quantity},00 р.</div>

                                </div>
                                <div  style={{color: '#999', textAlign: "end", fontSize: 14}}>
                                    {item.quantity !==1 ? item.price + ' р./шт.': null}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='finalPrice'>
                        <div className='d-flex justify-content-between mb-2' style={{color: '#999'}}>Доставка <div style={{fontSize: 16, lineHeight: 1.4, color: '#000'}}>{delivery === 0 ? 'бесплатно' : delivery +',00 р.'}</div></div>
                        <div className='d-flex justify-content-between'><span style={{fontWeight: 500}}>Итого</span><strong>{finalPrice},00 р.</strong></div>
                    </div>
                </div>
            </div>
        </Container>
    );
});

export default Order;