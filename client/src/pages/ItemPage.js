import React from 'react';
import Container from "react-bootstrap/Container";
import {Image} from "react-bootstrap";
import '../styles/ItemPage.css'

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
                    <div className='d-flex'>
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


                        <div className='feedback-button'>Оставить отзыв</div>
                    </div>
                </div>
                <div className='price-methods'></div>
            </div>
        </Container>
    );
};

export default ItemPage;