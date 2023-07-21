import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

    const placeNameRef = React.useRef();
    const placeLinkRef = React.useRef();

    React.useEffect(() => {
        placeNameRef.current.value = '';
        placeLinkRef.current.value = '';
    }, [props.isOpen])

    function handleSubmit() {
        props.onAddPlace({name: placeNameRef.current.value, link: placeLinkRef.current.value});
    }

    return(
        <PopupWithForm name="add-place"
                       title="Новое место"
                       buttonText="Создать"
                       isOpen={props.isOpen}
                       onClose={props.onClose}
                       onSubmit={handleSubmit}>
            <>
                <label className="popup__field">
                    <input ref={placeNameRef} type="text" name="name" required
                           className="popup__input popup__input_type_name"
                           placeholder="Название" id="name-place-input" minLength="2" maxLength="30"/>
                    <span className="popup__input-error name-place-input-error"></span>
                </label>
                <label className="popup__field">
                    <input ref={placeLinkRef} type="url" name="link" required
                           className="popup__input popup__input_type_link"
                           placeholder="Ссылка на картинку" id="link-input"/>
                    <span className="popup__input-error link-input-error"></span>
                </label>
            </>
        </PopupWithForm>
    )
}

export default AddPlacePopup