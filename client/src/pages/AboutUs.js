import React from 'react';

import '../styles/AboutUs.css'
const AboutUs = () => {
    return (
        <div>
            <div className='title_about'>
                <h1>About Us</h1>
            </div>
            <div className='content d-flex'>
                <div>
                    <div className='strip'/>
                    <div className='for_what'>
                        <h1>Наша история</h1>
                        <span>Зачем мы начали ?</span>
                    </div>
                </div>
                <div>Казалось бы, что тут сложного: если на странице написано много предложений — значит, перед нами текст. Но на самом деле это понятие более конкретное. Если кратко, текст — это не просто скопление предложений. В этой статье мы подробно расскажем о признаках, по которым можно определить, что перед нами именно он.</div>
            </div>
        </div>
    );
};

export default AboutUs;