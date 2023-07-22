import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {

    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id;
    const isLiked = card.likes.some(like => like === currentUser._id);

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <article className="place">
            {isOwn && <button className="place__delete" onClick={handleDeleteClick} />}
            <img onClick={handleClick} src={card.link} alt={card.name} className="place__image"/>
            <div className="place__info">
                <h2 className="place__name">{card.name}</h2>
                <div className="place__like-block">
                    <button type="button" onClick={handleLikeClick} className={`place__like${isLiked ? " place__like_active" : ""}`}></button>
                    <p className="place__like-count">{card.likes.length}</p>
                </div>
            </div>
        </article>
    )
}

export default Card