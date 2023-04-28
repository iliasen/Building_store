import React from 'react';
import {Col,Image} from "react-bootstrap";
import rate from '../res/star.png'
import '../styles/Item.css'

const Item = ({item}) => {
    return (
        <Col md={3}>
            <div className='div-container'>
                <Image className='Item_img' src={item.img}/>
                <div>
                    <header>Item</header>
                    <div>
                        <div>{item.rating}</div>
                        <Image src={rate}/>
                    </div>
                </div>
            </div>
        </Col>
    );
};

export default Item;