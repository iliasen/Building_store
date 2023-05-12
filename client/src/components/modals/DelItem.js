import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import {Form, Button} from 'react-bootstrap'
import {deleteOneItem} from "../../http/itemAPI";
import {observer} from "mobx-react-lite";

const DelItem =  observer(({show, onHide}) => {
    const [value, setValue] = useState('')

    const DeleteItem = () =>{
        deleteOneItem(value).then(data =>  {onHide()})
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удалить товар
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control placeholder={'Введите артикул товара для удаления'} type='number' value={value} onChange={(e) => setValue(e.target.value)}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-dark" onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant="outline-danger" onClick={DeleteItem}>
                    Удалить
                </Button>
            </Modal.Footer>
        </Modal>
    )
})

export default DelItem
