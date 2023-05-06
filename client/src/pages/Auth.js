import React, {useContext, useState} from 'react';
import '../styles/Auth.css'
import {NavLink, useLocation,  useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Form} from "react-bootstrap";



const Auth = observer(() => {
    console.log(process.env.REACT_APP_API_URL)
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE
    //console.log(location)

    const {user} = useContext(Context)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    let navigate = useNavigate();

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }
            user.setUser(data);
            user.setAuth(true);
            // use navigate instead of history.push

            navigate(SHOP_ROUTE);
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    return (
        <div className='main-container'>
            <div className='card-content'>
                <a aria-label="Гефест" href='/' className="Logo"></a>
                <h2 className='title'>{isLogin ? 'Авторизация':'Регистрация'}</h2>
                <Form className='main-form'>
                    <Form.Control placeholder='Введите email' value={email}  onChange={e => setEmail(e.target.value)} />
                    <Form.Control type='password' placeholder='Введите пароль' value={password} onChange={e => setPassword(e.target.value)} />

                    {/*<button*/}
                    {/*    id='enter'*/}
                    {/*    onClick={(event) => click(event)}*/}
                    {/*>*/}
                    {/*    {isLogin ? 'Войти' : 'Зарегистрироваться'}*/}
                    {/*</button>*/}

                    {isLogin ?(<button id='enter' onClick={click} >Войти</button>):(<button id='registration' onClick={click} ><NavLink to={LOGIN_ROUTE}>Зарегистрироваться</NavLink></button>)}
                    {isLogin ?(<button id='registration'><NavLink to={REGISTRATION_ROUTE}>Создать аккаунт</NavLink></button>):<div></div>}
                </Form>

            </div>
        </div>
    );
});

export default Auth;