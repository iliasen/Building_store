import React, {useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import {Image} from "react-bootstrap";
import {NavLink, useParams} from "react-router-dom";
import {PAYMENT_ROUTE} from "../utils/consts";
import {fetchOneItem} from "../http/itemAPI";

import Rating from "../components/modals/Rating";
import '../styles/ItemPage.css'

import no from '../res/ItemPage/no.png'
import yes from '../res/ItemPage/yes.png'
import location from '../res/ItemPage/location.png'
import wallet from '../res/ItemPage/wallet.png'
import about from '../res/ItemPage/about.png'



const ItemPage = () => {

    const [item, setItem] = useState({info: []})
    const {id} = useParams()
    useEffect(() => {
        fetchOneItem(id).then(data => setItem(data))
    }, [])

    const shops = [
        {id:1, location:"Сурганова д.5",flag: true},
        {id:2, location:"Рогачёвская д.5",flag: false},
        {id:3, location:"Кринково д. 117",flag: true},
        {id:4, location:"Маркса д. 24",flag: false}
    ]

    const feedbacks = [
        {id:1, user: 'Николай@gmail.com', user_feedback:'Товар полное дерьмо (((', user_rate: 1},
        {id:2, user: 'Иван@gmail.com', user_feedback:'Неплохой прибор', user_rate: 3},
        {id:3, user: 'Aлексей@gmail.com', user_feedback:'Very good', user_rate: 5},
    ]

    return (
        <Container>
            <div className='item-page-main-container'>
                <div className='left-side'>

                    <div className='about_item-container'>
                        <Image className='item-image-300' src={process.env.REACT_APP_API_URL + item.img}/>
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
                                }}>Оставить отзыв</div>
                        </div>

                        <div id='feedback-container'>
                            <form>
                                <div className='d-flex mb-2'>
                                    <div className='rate_check'>Ваша оценка:</div>
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

                                <textarea cols='40' rows='4' name='feedback'></textarea>

                                     <div className='button_container'>
                                         <input type='button' value='Отправить' onClick={() => {
                                             const textarea = document.getElementsByName('feedback')[0];
                                             if (textarea.value) {
                                                 const container = document.getElementById('feedback-container')
                                                 container.setAttribute('style','display: none;');
                                                 const rate = document.getElementsByName('rating')
                                                 for(let i of rate) {
                                                     if (i.checked){
                                                        console.log(i.value)
                                                    }
                                                 }
                                                 const feedback = document.getElementById('feedback-button')
                                                 feedback.setAttribute('style','display: none;');
                                                 const after = document.getElementById('after_feedback')
                                                 after.textContent="Спасибо за отзыв !"

                                                 console.log(textarea.value)
                                             }
                                         }}></input>
                                         <input type='reset'></input>
                                     </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                        <div className='characters-feedback_container'>{/*характеристики и отзывы о товаре*/}
                            <div className='characters-feedback-titles-container'>

                                <div className='character-title' onClick={() =>{
                                    const feedback = document.getElementById('feedback')
                                    feedback.setAttribute('style', 'display: none')
                                    const characters = document.getElementById('characters')
                                    characters.setAttribute('style', 'display: block')
                                }}>
                                    <div className="characters_img"></div>
                                    <div className='title'>Храктеристики</div>
                                </div>
                                <div className='feedback-title' onClick={() =>{
                                    const feedback = document.getElementById('feedback')
                                    feedback.setAttribute('style', 'display: block')
                                    const characters = document.getElementById('characters')
                                    characters.setAttribute('style', 'display: none')
                                }}>
                                    <div className='feedback_img'></div>
                                    <div className='title'>Отзывы</div>
                                </div>
                            </div>
                            <div className='characters-feedback'>
                                <div id='characters'>
                                    {item.info.map((info) =>
                                        <div key={info.id} className='item'>
                                            <span className='info_title'>{info.title}:</span> {info.description}
                                        </div>
                                    )}
                                </div>
                                <div id='feedback' style={{display: 'none'}}>
                                    {feedbacks.map((info) =>
                                        <div key={info.id} className='feedback_about_item'>
                                            <span className='info_title'>{info.user} :</span>
                                            <div>
                                                <Rating rating={info.user_rate} />
                                            </div>{info.user_feedback}
                                        </div> )} </div>
                            </div>
                        </div>

                        <div className='description-container'>
                            <Image src={about} style={{width: 30, height:30}} className='m-2'></Image>
                            <span>Описание</span>
                            <div className='description_item'>
                                <p>{item.description}</p>
                                <p>Внимание! Информация о товарах, представленная на нашем сайте, получена из открытых источников, в том числе каталогов производителей и официальных сайтов.</p>
                                <p>К сожалению, мы не можем гарантировать точность описаний товаров. Пожалуйста, уточняйте интересующую Вас информацию о товаре у менеджера и проверяйте товар при получении.</p></div>
                        </div>
                    </div>

                    <div className='right-side'>
                        <div className='price-methods'>
                            <div className='d-flex'>
                                <div className='price'>{item.price},00 руб/шт.</div>
                                <div className='availability'>
                                    <Image className='yes_no_mark' src={yes}></Image>
                                    <div> наличие</div>
                                </div>
                            </div>
                            <div>
                                <b>Цена в интернет-магазине</b>
                                <div className='description_other_shops'>
                                    В розничных магазинах цена товара может отличатся
                                </div>
                            </div>


                            <form className='buy-quantity'>
                                <input type="number" step="1" name="quantity" defaultValue='1' pattern="[1-9]*" className="form-control"/>
                                <input type='button' value='Добавить в корзину' className="button-image" onClick={() =>{
                                    const quantity = document.getElementsByName('quantity')[0]
                                    console.log(quantity.value)
                                }}/>
                            </form>

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
                                    <NavLink to={PAYMENT_ROUTE}><div className='belcard'></div></NavLink>
                                    <NavLink to={PAYMENT_ROUTE}><div className='visa'></div></NavLink>
                                    <NavLink to={PAYMENT_ROUTE}><div className='mastercard'></div></NavLink>
                                    <NavLink to={PAYMENT_ROUTE}><div className='nal'></div></NavLink>
                                </div>
                            </div>
                        </div>

                        <div className='shop-container'>
                            <span>
                                Наличие в магазинах
                            </span>
                            <div className='show_shops'>
                                {shops.map((shop)=>
                                    <div key={shop.id} className='item'>
                                        <span className='info_title'>ул. {shop.location}:</span> {shop.flag ? <Image className='yes_no_mark' src={yes}/> : <Image className='yes_no_mark' src={no}/>}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

            </div>
        </Container>
    );
};

export default ItemPage;