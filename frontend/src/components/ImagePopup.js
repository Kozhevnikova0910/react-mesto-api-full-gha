function ImagePopup(props) {
    return(
        <div className={`popup popup_type_picture${props.card.link ? ' popup_opened' : ''}`} >
            <figure className="picture">
                <button onMouseDown={props.onClose} type="button" className="popup__close-btn"></button>
                <img src={props.card.link} alt={props.card.name} className="picture__image"/>
                <figcaption className="picture__title">{props.card.name}</figcaption>
            </figure>
        </div>
    )
}

export default ImagePopup