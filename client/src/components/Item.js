import React from 'react'
import { Col, Image } from 'react-bootstrap'
import rate from '../res/star.png'
import '../styles/Item.css'
import { useNavigate } from 'react-router-dom'
import { ITEM_ROUTE } from '../utils/consts' // преремешение по ссылкам

const Item = ({ item }) => {
  const navigate = useNavigate()
  console.log(navigate)
  return (
    <Col md={3} onClick={() => navigate(ITEM_ROUTE + '/' + item.id)}>
      <div className="items-container">
        <Image
          className="Item_img"
          src={process.env.REACT_APP_API_URL + item.img}
        />
        <div className="description">
          <header className="type">{item.brand} brand</header>
          <div className="rate_container">
            <div>{item.rating}</div>
            <Image className="star_img" src={rate} />
          </div>
        </div>
        <div>{item.name}</div>
      </div>
    </Col>
  )
}

export default Item
