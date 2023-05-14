import React from 'react'
import Container from "react-bootstrap/Container";
import '../styles/Basket.css'
import {fetchOneType} from "../http/itemAPI";
const Basket = () => {

  const [type_name, setType_name] = React.useState(null);

  React.useEffect(() => {
    fetchOneType(1).then(type => {
      setType_name(type.name);
    });
  }, []);



  return <Container className='basket-container'>
    <div className='basket-head'>
      <div className="basket-title">
        Корзина
      </div>
      <div className='d-flex'>
        <div className='location-image'/>
        <div>
          <div>
            Ваш населенный пункт: <a className='cart-form__link_base-alter'>Минск</a>
          </div>
          <div className="cart-form__description">
            Наличие доставки и ее стоимость зависят от выбранного населенного пункта
          </div>
        </div>
      </div>
    </div>
    <div className='basket-content'>
      <div>
        <div>
          {type_name}
        </div>
      </div>
      <div className='making_an_order'>
        <div>
          <span className='time'>Через 1 день</span> <span className='disclaimer'> доставка в г. Минск</span>
          <ul>
            <li>по адресу — <strong >бесплатно</strong></li>
            <li>в пункт выдачи — <strong>бесплатно</strong></li>
          </ul>
        </div>
        <div className='d-flex flex-column justify-content-between'>
          <div>{} товар на сумму:ㅤ <strong style={{scale: 1.2, fontSize: 15, fontWeight: 600}}>{},00 р.</strong></div>
          <button>Перейти к оформлению </button>
        </div>
      </div>
    </div>
  </Container>
}

export default Basket
