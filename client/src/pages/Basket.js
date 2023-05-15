import React, {useContext} from 'react'
import Container from "react-bootstrap/Container";
import '../styles/Basket.css'
import BasketItem from "../components/BasketItem";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Image} from "react-bootstrap";
import emptyBasket from '../res/Basket/empty_basket.png'
import {ITEM_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";


const Basket = observer(() => {

  const {user} = useContext(Context)
  const navigate = useNavigate()
  const basket_items = [//заглушка
    {
      id: 3,
      name: "MAKITA DP4010",
      price: 270,
      quantity: 2,
      img: "8d800e89-2607-40f7-9254-054ebc8598de.jpg",
      about: "какой-то опущенный текст",
      typeId: 3,
    },
    {
      id: 2,
      name: "BOSCH GWS 660 Professional",
      price: 190,
      quantity: 1,
      img: "87a4e670-34ff-4fc7-8867-eae1d0613b9f.jpg",
      about: "При весе всего 2 кг это компактный и удобный для работы инструмент. В наборе дополнительная рукоятка для удобства работы с техникой и ключ под два отверстия",
      typeId: 1,
    },
    {
      id: 4,
      name: "Союз ЛБС-4050",
      price: 128,
      quantity: 1,
      img: "9eebf7ac-c5a5-4e53-9366-f22519f628cc.jpg",
      about: "Лобзик электрический Союз ЛБС-4050 предназначен для бытовых целей. Применяется для распиливания заготовок из дерева и металла.",
      typeId: 5,
    }
  ]
  const total = basket_items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const total_quantity = basket_items.reduce((sum, item) => sum + item.quantity, 0)
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

    {basket_items.length !== 0 ? <div>
      <div className='basket-content'>
        <div>
          <div>
            <div>
              {basket_items.map((item) => (
                  <BasketItem key={item.id} item={item} />
              ))}
            </div>
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
            <div className='d-flex'>
              <span className='total_quantity'>{total_quantity}</span>
              {total_quantity === 1 ? 'товар' : total_quantity < 5 ? 'товара' : 'товаров'} на сумму:ㅤ
              {user.Auth ?
                  <div className='d-flex' >
                    <strong style={{scale: 1.2, fontSize: 15, fontWeight: 600}}>{Math.ceil(total * 0.95)},00 р.</strong>
                    <div style={{fontSize:12, color: '#999'}}>*cкидка 5%</div>
                  </div> : <strong style={{scale: 1.2, fontSize: 15, fontWeight: 600}}>{total},00 р.</strong>}
            </div>
            <button>Перейти к оформлению </button>
          </div>
        </div>
      </div>
    </div> :

        <div className='EmptyBasket'>
          <Image src={emptyBasket} style={{width: 360, height: 320}}/>

            <h1>Ваша корзина пуста</h1>
            <div>Перейдите в <span onClick={() => navigate(SHOP_ROUTE)}>каталог</span> и добавьте товары.</div>
        </div>}

  </Container>
})

export default Basket
