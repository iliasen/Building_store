import React, {useContext, useEffect} from 'react'
import Container from "react-bootstrap/Container";
import '../styles/Basket.css'
import BasketItem from "../components/BasketItem";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Image} from "react-bootstrap";
import {SHOP_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import emptyBasket from "../res/Basket/empty_basket.png"
import {getItems} from "../http/basketAPI";


const Basket = observer(() => {

  const {user} = useContext(Context)
  const navigate = useNavigate()
  const { basket } = useContext(Context)

  useEffect(()=> {
    getItems(user.user.id).then((items) => basket.setBasket_items(items))
  }, [basket.basket_items])


  const total = basket.basket_items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const total_quantity = basket.basket_items.reduce((sum, item) => sum + item.quantity, 0)
  let finalprice = total > 650 ? total * 0.95 : total
  let totalWithDelivery = total < 500 ? finalprice + 30 : finalprice;

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

    {basket.basket_items.length !== 0 ? <div>
      <div className='basket-content'>
        <div>
          <div>
            <div>
              {basket.basket_items.map((item) => (
                  <BasketItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>


        <div className='making_an_order'>
          <div>
            <span className='time'>Через 1 день</span> <span className='disclaimer'> доставка в г. Минск</span>
            <ul>
              {total >= 500 ? <li>по адресу — <strong >бесплатно</strong></li> : <li>по адресу — <strong >30 р.</strong></li>}
              <li>в пункт выдачи — <strong>бесплатно</strong></li>
            </ul>
          </div>

          <div className='d-flex flex-column justify-content-between'>
            <div className='d-flex'>
              <span className='total_quantity'>{total_quantity}</span>
              {total_quantity === 1 ? 'товар' : total_quantity < 5 ? 'товара' : 'товаров'} на сумму:ㅤ
              {total > 650 ?
                  <div className='d-flex' >
                    <strong style={{scale: 1.2, fontSize: 15, fontWeight: 600}}>{finalprice},00 р.</strong>
                    <div style={{fontSize:12, color: '#999'}}>*cкидка 5%</div>
                  </div> : <strong style={{scale: 1.2, fontSize: 15, fontWeight: 600}}>{finalprice},00 р.</strong>}
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
