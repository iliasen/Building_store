import React, {useContext} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import Item from "./Item";
import '../styles/ItemList.css'
import {Row} from "react-bootstrap";

const ItemList = observer(() => {
    const {item} = useContext(Context)
    return (
        <Row className='list'>
            {item.items.map(item =>
                <Item key={item.id} item={item}/>
            )}
        </Row>
    );
});

export default ItemList;