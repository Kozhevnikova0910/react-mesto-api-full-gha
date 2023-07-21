import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {

    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit() {
        // Запрещаем браузеру переходить по адресу формы

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [props.isOpen])

    return (
        <PopupWithForm name="edit-profile"
                       title="Редактировать профиль"
                       buttonText="Сохранить"
                       isOpen={props.isOpen}
                       onClose={props.onClose}
                       onSubmit={handleSubmit}>
            <>
                <label className="popup__field">
                    <input onChange={handleNameChange} value={name} type="text" name="name" required
                           className="popup__input popup__input_type_name"
                           placeholder="Имя" id="name-input" minLength="2" maxLength="40"/>
                    <span className="popup__input-error name-input-error"></span>
                </label>
                <label className="popup__field">
                    <input onChange={handleDescriptionChange} value={description} type="text" name="description"
                           required
                           className="popup__input popup__input_type_about"
                           placeholder="О себе" id="about-input" minLength="2" maxLength="200"/>
                    <span className="popup__input-error about-input-error"></span>
                </label>
            </>
        </PopupWithForm>
    )
}

export default EditProfilePopup