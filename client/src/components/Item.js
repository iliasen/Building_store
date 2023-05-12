import React from 'react'
import { Col, Image } from 'react-bootstrap'
import rate from '../res/star.png'
import '../styles/Item.css'
import { useNavigate } from 'react-router-dom'
import { ITEM_ROUTE } from '../utils/consts'
import {fetchOneType} from "../http/itemAPI";

const Item = ({ item }) => {
  const navigate = useNavigate()

  const [type_name, setType_name] = React.useState(null); // initialize state with null

  React.useEffect(() => {
    // fetch data and set state when promise resolves
    fetchOneType(item.typeId).then(type => {
      setType_name(type.name);
    });
  }, []);


  return (
    <Col md={3} onClick={() => navigate(ITEM_ROUTE + '/' + item.id)}>
      <div className="items-container">
        <Image
          className="Item_img"
          src={process.env.REACT_APP_API_URL + item.img}
        />
        <div className="description">
          <header className="type">{type_name}</header>
          <div className="rate_container">
            <div>{item.rating}</div>
            <Image className="star_img" src={rate} />
          </div>
        </div>
        <div className='d-flex align-items-center'>{item.name}</div>
      </div>
    </Col>
  )
}

export default Item
