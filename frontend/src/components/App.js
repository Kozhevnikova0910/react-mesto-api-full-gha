import React from 'react';
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import api from '../utils/Api.js';
import * as auth from '../utils/Auth';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js'
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from "./ImagePopup";
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import PopupWithDelete from "./PopupWithDelete";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isPopupWithDeleteOpen, setIsPopupWithDeleteOpen] =
        React.useState(false);
    const [cardWithDelete, setCardWithDelete] = React.useState(null);

    const [selectedCard, setSelectedCard] = React.useState({
        name: '',
        link: ''
    });
    const [currentUser, setCurrentUser] = React.useState(CurrentUserContext);

    const [cards, setCards] = React.useState([])

    const [loggedIn, setLoggedIn] = React.useState(false);

    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false)
    const [infoTooltipLabel, setInfoTooltipLabel] = React.useState('')
    const [infoTooltipAltImg, setInfoTooltipAltImg] = React.useState('Ошибка')
    const [isRegistrationSuccess, setIsRegistrationSuccess] = React.useState(true)

    const navigate = useNavigate();

    React.useEffect(() => {
        checkToken();
        if (loggedIn) {
            api.getInitialCards()
                .then(cardsData => {
                    setCards(cardsData)
                })
                .catch(err => console.log(err))
        }
    }, [loggedIn])

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsPopupWithDeleteOpen(false);
        setSelectedCard({
            name: '',
            link: ''
        });
    }

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
            setCards(() => cards.map((c) => c._id === card._id ? newCard : c));
        })
            .catch(res => {console.log(res)})
    }

    function handleCardDelete(card) {
        setIsPopupWithDeleteOpen(true);
        setCardWithDelete(card);
    }

    function handleCardDeleteConfirmed(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards(() => cards.filter(c => c._id !== card._id ));
                closeAllPopups();
            })
            .catch(res => {console.log(res)})
    }

    function handleUpdateUser(newUserData) {
        api.patchUserInfo(newUserData)
            .then(resUserData => {
                setCurrentUser(resUserData);
                closeAllPopups();
            })
            .catch(err => console.log(err))
    }

    function handleUpdateAvatar(newAvatar) {
        api.patchAvatar(newAvatar)
            .then(res => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch(err => console.log(err))
    }

    function handleAddPlace(newPlace) {
        api.postNewCard(newPlace)
            .then(resCard => {
                setCards([resCard, ...cards]);
                closeAllPopups();
            })
            .catch(err => console.log(err))
    }

    function closePopupInfo() {
        setIsInfoTooltipOpen(false)
    }

    function handleRegistration(data) {
        auth.registration(data)
            .then(res => {
                setIsRegistrationSuccess(true)
                setInfoTooltipLabel('Вы успешно зарегистрировались!')
                setInfoTooltipAltImg('Ошибка')
                setIsInfoTooltipOpen(true)
            })
            .catch(err => {
                setIsRegistrationSuccess(false)
                setInfoTooltipLabel('Что-то пошло не так! Попробуйте ещё раз.')
                setInfoTooltipAltImg('Успех')
                setIsInfoTooltipOpen(true)
                console.log(err)
            })
    }

    function handleAuthorization(data) {
        auth.authorization(data)
            .then(res => {
                if (res.token) {
                    setLoggedIn(true);
                    localStorage.setItem('token', res.token);
                    checkToken();
                    navigate('/', {replace: true});

                }
            })
            .catch(err => console.log(err))
    }

    function checkToken() {
        if (localStorage.getItem('token')) {
            const token = localStorage.getItem('token');
            auth.checkToken(token)
                .then(res => {
                    if (res) {
                        setLoggedIn(true);
                        setCurrentUser({
                            _id: res._id,
                            name: res.name,
                            about: res.about,
                            avatar: res.avatar,
                            email: res.email,
                        })
                        navigate('/', {replace: true});
                    }
                })
                .catch(err => console.log(err))
        }
    }

    function signOut() {
        localStorage.removeItem('token');
        setCurrentUser({});
        setLoggedIn(false);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
            <Routes>
                <Route path="/" element={
                    <>
                        <Header email={currentUser.email} onSignOut={signOut}/>
                        <ProtectedRoute element={Main}
                                        loggedIn={loggedIn}
                                        onEditProfile={handleEditProfileClick}
                                        onAddPlace={handleAddPlaceClick}
                                        onEditAvatar={handleEditAvatarClick}
                                        cards={cards}
                                        onCardClick={handleCardClick}
                                        onCardLike={handleCardLike}
                                        onCardDelete={handleCardDelete}/>
                    </>
                }/>
                <Route path="/signup" element={
                    <>
                        <Header label="Войти" link="/signin"/>
                        <Register onSignUpClick={handleRegistration}/>
                        <InfoTooltip
                            isOpen={isInfoTooltipOpen}
                            infoTooltipLabel={infoTooltipLabel}
                            infoTooltipAltImg={infoTooltipAltImg}
                            isRegistrationSuccess={isRegistrationSuccess}
                            onClose={closePopupInfo}
                        />
                    </>
                }/>
                <Route path="/signin" element={
                    <>
                        <Header label="Регистрация" link="/signup"/>
                        <Login onSignInClick={handleAuthorization}/>
                    </>
                }/>
                <Route path='*' element={<Navigate to='/signin' replace/>}/>
            </Routes>
            {loggedIn && <Footer/>}
            <EditProfilePopup onUpdateUser={handleUpdateUser}
                              isOpen={isEditProfilePopupOpen}
                              onClose={closeAllPopups} />
            <AddPlacePopup onAddPlace={handleAddPlace}
                           isOpen={isAddPlacePopupOpen}
                           onClose={closeAllPopups} />
            <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar}
                             isOpen={isEditAvatarPopupOpen}
                             onClose={closeAllPopups} />
            <ImagePopup card={selectedCard}
                        onClose={closeAllPopups}/>
            <PopupWithDelete isOpen={isPopupWithDeleteOpen}
                             onClose={closeAllPopups}
                             onDeleteCardConfirm={handleCardDeleteConfirmed}
                             card={cardWithDelete} />
        </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
