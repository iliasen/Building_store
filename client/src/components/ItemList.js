import React, {useContext} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import Item from "./Item";
import '../styles/ItemList.css'

const ItemList = observer(() => {
    const {item} = useContext(Context)
    return (
        <div className='list'>
            {item.items.map(item =>
                <Item key={item.id} item={item}/>
            )}
        </div>
    );
});

export default ItemList;