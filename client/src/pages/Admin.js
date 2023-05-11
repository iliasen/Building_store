import React, { useState } from 'react'
import { Button, Container, Image } from 'react-bootstrap'
import CreateBrand from '../components/modals/CreateBrand'
import CreateItem from '../components/modals/CreateItem'
import CreateType from '../components/modals/CreateType'

import logo from '../res/лого.png'

const Admin = () => {
  const [brandVisible, setBrandVisible] = useState(false)
  const [typeVisible, setTypeVisible] = useState(false)
  const [itemVisible, setItemVisible] = useState(false)

  return (
    <Container className="d-flex flex-column justify-content-center container-shop mt-5" style={{padding:235}}>
      <Image
        src={logo}
        style={{ width: 300, height: 300 }}
        className="m-auto mt-5"
      ></Image>
      <div className="d-flex flex-column">
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
            //onClick={() => setItemVisible(true)}
        >
          Изменить тип
        </Button>
        <Button
            variant={'outline-success'}
            className="mt-4 p-2"
            //onClick={() => setItemVisible(true)}
        >
          Изменить бренд
        </Button>
        <Button
            variant={'outline-danger'}
            className="mt-4 p-2"
            onClick={() => setItemVisible(true)}
        >
          Удалить тип
        </Button>
        <Button
            variant={'outline-danger'}
            className="mt-4 p-2"
            onClick={() => setItemVisible(true)}
        >
          Удалить бренд
        </Button>
        <Button
            variant={'outline-danger'}
            className="mt-4 p-2"
            onClick={() => setItemVisible(true)}
        >
          Удалить товар
        </Button>


        <CreateBrand
          show={brandVisible}
          onHide={() => setBrandVisible(false)}
        />
        <CreateItem show={itemVisible} onHide={() => setItemVisible(false)} />
        <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
      </div>
    </Container>
  )
}
export default Admin
