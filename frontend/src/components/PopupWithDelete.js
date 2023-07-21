import React from 'react'
import PopupWithForm from '../components/PopupWithForm'

function PopupWithDelete(props) {
    function handleSubmit() {
        props.onDeleteCardConfirm(props.card);
    }

    return (
        <PopupWithForm name="delete" title="Вы уверены" buttonText="Да" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}></PopupWithForm>
    );
}

export default PopupWithDelete