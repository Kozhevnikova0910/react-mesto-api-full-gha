import React from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main(props) {

    const currentUser = React.useContext(CurrentUserContext)



    return(
        <main className="content">
            <section className="profile">
                <div className="profile__data">
                    <div onClick={props.onEditAvatar} className="profile__avatar-container">
                        <img src={currentUser.avatar} alt="аватар" className="profile__avatar"/>
                        <div className="profile__avatar-hover"></div>
                    </div>
                    <div className="profile__info">
                        <div className="profile__name-edit">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button onClick={props.onEditProfile} type="button" className="profile__edit-btn"></button>
                        </div>
                        <h2 className="profile__description">{currentUser.about}</h2>
                    </div>
                </div>
                <button onClick={props.onAddPlace} type="button" className="profile__add-btn"></button>
            </section>
            <section className="places">
                {props.cards.map((card) => <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>)}
            </section>
        </main>
    )


}

export default Main