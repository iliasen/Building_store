import React, {useEffect, useState} from 'react';

import {Image} from "react-bootstrap";

import b1 from '../res/AboutUsPage/build_1.jpg'
import b2 from '../res/AboutUsPage/build_2.webp'
import b3 from '../res/AboutUsPage/build_3.webp'
import '../styles/AboutUs.css'

import Slideshow from "../components/modals/Slide";

const AboutUs = () => {
    return (
        <div className='aboutUs-container'>
            <div className='title_about'>
                <h1>About Us</h1>
            </div>

            <div className='logo_about' />

            <div className='content d-flex'>
                <div>
                    <div className='strip'/>
                    <div className='for_what'>
                        <h1>Наша история</h1>
                        <span>C чего мы начали ?</span>
                    </div>
                </div>
                <div>
                    Гефест - это сеть строительных магазинов, которая была основана в 2018 году супругами Ильёй и Юлией Семенкович. Они начали свой бизнес с небольшого склада на окраине Минска, где продавали строительные материалы и инструменты по низким ценам. Спрос на их товары быстро рос, и они решили открыть свой первый магазин в центре города. С тех пор компания расширила свою сеть до 15 магазинов по всей Беларуси и стала одним из лидеров на рынке строительных товаров. Гефест отличается от конкурентов своим широким ассортиментом, высоким качеством, гибкой системой скидок и бонусов, а также профессиональным обслуживанием клиентов. Компания также активно участвует в социальных проектах, спонсируя строительство детских площадок, школ и больниц в разных регионах страны. Гефест - это компания, которая строит не только дома, но и доверие.
                </div>
            </div>

            <Slideshow/>

        </div>
    );
};

export default AboutUs;