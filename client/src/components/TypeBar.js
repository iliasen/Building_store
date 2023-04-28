import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";
import '../styles/TypeBar.css'


const TypeBar = observer(() => {
    const {item} = useContext(Context)
    return (
        <div className='div-container'>
            <div className='main'>
            <p>Тип товара</p>
            <ListGroup>
                {item.types.map(type =>
                    <ListGroup.Item className='guidance' active={type.id === item.selectedType.id}
                    onClick={() => item.setSelectedType(type)}
                                    key={type.id}>
                        {type.name}
                    </ListGroup.Item>
                )}
                </ListGroup>
                <p>Бредны</p>
                <ListGroup>
                    {item.brands.map(brand =>
                        <ListGroup.Item className='guidance' active={brand.id === item.selectedBrand.id}
                                        onClick={() => item.setSelectedBrand(brand)}
                                        key={brand.id}>
                            {brand.name}
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </div>
        </div>
);
});

export default TypeBar;