import React, {useContext, useEffect, useState} from 'react'
import { Button, Container, Image } from 'react-bootstrap'
import CreateBrand from '../components/modals/CreateBrand'
import CreateItem from '../components/modals/CreateItem'
import CreateType from '../components/modals/CreateType'
import {getOrder} from "../http/orderAPI";
import logo from '../res/лого.png'
import ChangeType from "../components/modals/ChangeType";
import ChangeBrand from "../components/modals/ChangeBrand";
import DelType from "../components/modals/DelType";
import DelBrand from "../components/modals/DelBrand";
import DelItem from "../components/modals/DelItem";
import {Context} from "../index";

import "../styles/Admin.css"
import {observer} from "mobx-react-lite";
import OrderItem from "../components/modals/OrderItem";


const Admin = observer(() => {
  const [brandVisible, setBrandVisible] = useState(false)
  const [brandChangeVisible, setBrandChangeVisible] = useState(false)
  const [brandDelVisible, setBrandDelVisible] = useState(false)
  const [typeVisible, setTypeVisible] = useState(false)
  const [typeChangeVisible, setTypeChangeVisible] = useState(false)
  const [typeDelVisible, setTypeDelVisible] = useState(false)
  const [itemVisible, setItemVisible] = useState(false)
  const [itemDelVisible, setItemDelVisible] = useState(false)
  const {user} = useContext(Context)
  const {order} = useContext(Context)

  useEffect(()=> {
      getOrder().then((orders)=> order.setOrder(orders))
      console.log(order.order.length)
  },[])


  return (
    <Container className="d-flex flex-column justify-content-center  mt-5" style={{paddingRight:235, paddingLeft:235, paddingBottom: 40}}>
      
      {user.user.role === 'ADMIN' && <div className='d-flex justify-content-center'>
      <Button variant='outline-info' style={{marginRight: 72}} onClick={() => {
        const orders = document.getElementById('orders')
        orders.setAttribute('style', 'display: none')
        const admin = document.getElementById('adminPanel')
        admin.setAttribute('style', 'display: flex')
      }}>Управление</Button>
      <Button variant='outline-info' onClick={() => {
        const orders = document.getElementById('orders')
        orders.setAttribute('style', 'display: flex')
        const admin = document.getElementById('adminPanel')
        admin.setAttribute('style', 'display: none')
      }}>Заказы</Button>
      </div>}

      <Image
        src={logo}
        style={{ width: 300, height: 300 }}
        className="m-auto mt-5"
      ></Image>
      {user.user.role === 'ADMIN' ? <div id='adminPanel'>
        <Button
            variant={'outline-dark'}
            className="mt-4 p-2"
            onClick={() => setTypeVisible(true)}
        >
          Добавить тип
        </Button>
        <Button
            variant={'outline-dark'}
            className="mt-4 p-2"
            onClick={() => setBrandVisible(true)}
        >
          Добавить бренд
        </Button>
        <Button
            variant={'outline-dark'}
            className="mt-4 p-2"
            onClick={() => setItemVisible(true)}
        >
          Добавить товар
        </Button>
        <Button
            variant={'outline-success'}
            className="mt-4 p-2"
            onClick={() => setTypeChangeVisible(true)}
        >
          Изменить тип
        </Button>
        <Button
            variant={'outline-success'}
            className="mt-4 p-2"
            onClick={() =>  setBrandChangeVisible(true)}
        >
          Изменить бренд
        </Button>
        <Button
            variant={'outline-danger'}
            className="mt-4 p-2"
            onClick={() => setTypeDelVisible(true)}
        >
          Удалить тип
        </Button>
        <Button
            variant={'outline-danger'}
            className="mt-4 p-2"
            onClick={() => setBrandDelVisible(true)}
        >
          Удалить бренд
        </Button>
        <Button
            variant={'outline-danger'}
            className="mt-4 p-2"
            onClick={() => setItemDelVisible(true)}
        >
          Удалить товар
        </Button>


        <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
        <ChangeType show={typeChangeVisible} onHide={() => setTypeChangeVisible(false)} />
        <DelType show={typeDelVisible} onHide={() => setTypeDelVisible(false)} />
        <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
        <ChangeBrand show={brandChangeVisible} onHide={() => setBrandChangeVisible(false)} />
        <DelBrand show={brandDelVisible} onHide={() => setBrandDelVisible(false)}/>
        <CreateItem show={itemVisible} onHide={() => setItemVisible(false)} />
        <DelItem show={itemDelVisible} onHide={() => setItemDelVisible(false)}/>
      </div>: <div style={{textAlign: "center" , fontSize: 40}}>В доступе отказано !</div>}


          <div id="orders">
              {order.order.length !== 0 ?
                  <div>
                      {order.order.map((order) =>
                          (<OrderItem key={order.id} order={order}/>)
                      )}
                  </div>:<h3 className='emptyOrder'>Сейчас заказов нет</h3>}
      </div>


    </Container>
  )
})
export default Admin
