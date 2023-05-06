import React, {useContext, useEffect} from 'react';
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import ItemList from "../components/ItemList";
import '../styles/Shop.css'
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchItems, fetchTypes} from "../http/itemAPI";


const Shop = observer(() => {
    const {item} = useContext(Context)

    useEffect(() => {
        fetchTypes().then(data => item.setTypes(data))//передаем то что вернулось в запросе
        fetchBrands().then(data => item.setBrands(data))
        fetchItems().then(data => item.setItems(data.rows))
    },[])

    return (
        <Container className='container-shop'>
            <Row style={{height: 150}}>
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <ItemList/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;