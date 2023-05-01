import React from 'react';
import Container from "react-bootstrap/Container";
import {Image} from "react-bootstrap";
import {NavLink} from "react-router-dom";

import '../styles/ItemPage.css'

// import no from '../res/ItemPage/no.png'
import yes from '../res/ItemPage/yes.png'
import shop from '../res/ItemPage/shop.png'
import location from '../res/ItemPage/location.png'
import wallet from '../res/ItemPage/wallet.png'

const ItemPage = () => {
    const item={id:1,	name:"Тачка Eco-2",price:159,img:"091b53f0-cb23-4602-9b0b-c0b74fcdf223.jpg", typeID:1, brandId:1, rating: 0}
    return (
        <Container>
            <div className='about_item-container'>
                    <Image className='item-image-300' src={item.img}/>
                    <div className='head'>
                        <div className='name-article'>
                            <h1>{item.name}</h1>
                            <p>Артикул: {item.id}</p>
                        </div>
                        <div>

                            <div className='d-flex'>
                                <div className='mark_rate'>{item.rating}</div>
                                <div className='rate'></div>
                                <div id='after_feedback'></div>
                                <div  id='feedback-button' onClick={() => {
                                    const container = document.getElementById('feedback-container')
                                    container.setAttribute('style','display: block;');
                                    const feedback = document.getElementById('feedback-button')
                                    feedback.setAttribute('style','display: none;');
                                }
                                }>Оставить отзыв</div>
                            </div>
                            <div id='feedback-container'>
                                <div className='d-flex mb-2'>
                                    <div>Ваша оценка:</div>
                                    <div className="rating_block">
                                        <input name="rating" value="5" id="rating_5" type="radio"/>
                                        <label htmlFor="rating_5" className="label_rating"></label>

                                        <input name="rating" value="4" id="rating_4" type="radio"/>
                                        <label htmlFor="rating_4" className="label_rating"></label>

                                        <input name="rating" value="3" id="rating_3" type="radio"/>
                                        <label htmlFor="rating_3" className="label_rating"></label>

                                        <input name="rating" value="2" id="rating_2" type="radio"/>
                                        <label htmlFor="rating_2" className="label_rating"></label>

                                        <input name="rating" value="1" id="rating_1" type="radio"/>
                                        <label htmlFor="rating_1" className="label_rating"></label>
                                    </div>
                                </div>
                                <form>
                                    <textarea cols='40' rows='4' name='feedback'></textarea>
                                    <div className='button_container'>
                                        <input type='button' value='Отправить' onClick={() => {
                                            const textarea = document.getElementsByName('feedback')[0];
                                            if (textarea.value) {
                                                const container = document.getElementById('feedback-container')
                                                container.setAttribute('style','display: none;');
                                                const feedback = document.getElementById('feedback-button')
                                                feedback.setAttribute('style','display: none;');
                                                const after = document.getElementById('after_feedback')
                                                after.textContent="Спасибо за отзыв !"
                                            }
                                        }}></input>
                                        <input type='reset'></input>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='price-methods'>
                        <div className='d-flex'>
                            <div className='price'>{item.price},00 руб/шт.</div>
                            <div className='availability'>
                                <Image className='yes_mark' src={yes}></Image>
                                <div> наличие</div>
                            </div>
                        </div>
                        <div>
                            <b>Цена в интернет-магазине</b>
                            <div className='description_other_shops'>
                                В розничных магазинах цена товара может отличатся
                            </div>
                        </div>
                        <div className='buy-quantity'>
                            <input type="number" step="1" name="quantity" pattern="[1-9]*" className="form-control"/>
                            <button>Добавить в корзину <Image className='buy_image' src={shop}/></button>
                        </div>
                        <div className='delivery'>
                            <Image className='location_wallet_img' src={location}></Image>
                            <b>Доставка товаров по г.Минск</b>
                            <div className='from_other_space'>
                                <div>Самовывоз из магазина..........0 р.</div>
                                <div>Бесплатная доставка:</div>
                                <div>По Минску..........................от 700 р.</div>
                                <div>По всей Беларуси........ от 1400 р.</div>
                            </div>
                        </div>
                        <div className='opportunity'>
                            <Image className='location_wallet_img' src={wallet}/>
                            <b>Способы оплаты</b>
                            <div className='image_container'>
                                <NavLink to='/'><div className='belcard'></div></NavLink>
                                <NavLink to='/'><div className='visa'></div></NavLink>
                                <NavLink to='/'><div className='mastercard'></div></NavLink>
                                <NavLink to='/'><div className='nal'></div></NavLink>
                            </div>
                        </div>
                    </div>
                </div>


                <div className='characters-feedback_container'>{/*характеристики и отзывы о товаре*/}
                    <div className='characters-feedback-titles-container'>
                        <div className='character-title'>
                            <div className="characters_img"></div>
                            <div className='title'>Храктеристики</div>
                        </div>
                        <div className='feedback-title'>
                            <div className='feedback_img'></div>
                            <div className='title'>Отзывы</div>
                        </div>
                    </div>

                    <div className='characters-feedback'> c</div>
                </div>
        </Container>
    );
};

export default ItemPage;