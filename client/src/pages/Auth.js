import React from 'react';
import '../styles/Auth.css'
import {NavLink, useLocation} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
const Auth = () => {
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE
    console.log(location)

    return (
        <div className='main-container'>
            <div className='card-content'>
                <a aria-label="Гефест" href='/' className="Logo"></a>
                <h2 className='title'>{isLogin ? 'Авторизация':'Регистрация'}</h2>
                <form className='main-form'>
                    <input placeholder='Введите email'></input>
                    <input type='password' placeholder='Введите пароль'></input>
                    {isLogin ?(<button id='enter'>Войти</button>):(<button id='registration'><NavLink to={LOGIN_ROUTE}>Зарегистрироваться</NavLink></button>)}
                    {isLogin ?(<button id='registration'><NavLink to={REGISTRATION_ROUTE}>Создать аккаунт</NavLink></button>):<div></div>}
                </form>

            </div>
        </div>
    );
};

export default Auth;