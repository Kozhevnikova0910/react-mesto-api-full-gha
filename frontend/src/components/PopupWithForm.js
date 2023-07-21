function PopupWithForm(props) {

    function handleSubmit(e) {
        e.preventDefault();
        props.onSubmit();
    }

    return(
        <div className={`popup popup_type_${props.name}${props.isOpen ? ' popup_opened' : ''}`}>
            <div className="popup__container">
                <button onMouseDown={props.onClose} type="button" className="popup__close-btn"></button>
                <h2 className="popup__title">{props.title}</h2>
                <form onSubmit={handleSubmit} className="popup__form" name={props.name}>
                    {props.children}
                    <button type="submit" className="popup__submit-btn">{props.buttonText}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm