import React from 'react';
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import ItemList from "../components/ItemList";
import '../styles/Shop.css'
const Shop = () => {
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
};

export default Shop;