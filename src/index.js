import './pages/index.css';
import {addCard, handleCardClick, popupDelete, cardIdForDelete} from './components/card.js';
import {openPopup, closePopup} from './components/modal.js';
import {validationConfig} from './components/constants.js';
import {enableValidation, clearValidation} from './components/validation.js';
import {config, createNewCard, updateAvatar, updateProfile, renderLoading, profileAvatar, profileTitle, profileDescription, cardParams, placesList, content, profileId, deleteCard, likeCard, dislikeCard} from './components/api.js'

const buttonNewPlace = document.querySelector('.profile__add-button');
const buttonProfileEdit = document.querySelector('.profile__edit-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupNewAvatar = document.querySelector('.popup_type_new-avatar')
const popups = document.querySelectorAll('.popup')
const formEditProfile = document.forms['edit-profile'];
const formNewCard = document.forms['new-place'];
const formDelete = document.forms['delete'];
const formNewAvatar = document.forms['new-avatar'];
const newAvatarLink = formNewAvatar.elements.link;
const nameProfile = formEditProfile.elements.name;
const descriptionProfile = formEditProfile.elements.description;


popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_is-opened')) {
        closePopup(popup);
      };
      if (evt.target.classList.contains('popup__close')) {
        closePopup(popup);
      };
  });
});

profileAvatar.addEventListener('click', function() {
  openPopup(popupNewAvatar);
});

buttonNewPlace.addEventListener('click', function () {
  formNewCard.reset();
  clearValidation (formNewCard, validationConfig);
  openPopup(popupNewCard);
});

buttonProfileEdit.addEventListener('click', function () {
  formEditProfile.reset();
  nameProfile.value = profileTitle.textContent;
  descriptionProfile.value = profileDescription.textContent;
  clearValidation (formEditProfile, validationConfig);
  openPopup(popupProfileEdit);
});

formNewCard.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const {submitButtonSelector} = validationConfig;
  const buttonElement = formNewCard.querySelector(submitButtonSelector);
  createNewCard(formNewCard.elements['place-name'].value, formNewCard.elements.link.value, buttonElement);
  formNewCard.reset();
  closePopup(popupNewCard);
});

formDelete.addEventListener('submit', function (evt) {
  evt.preventDefault();
  deleteCard(cardIdForDelete);
  closePopup(popupDelete);
});

formNewAvatar.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const {submitButtonSelector} = validationConfig;
  const buttonElement = formNewAvatar.querySelector(submitButtonSelector);
  updateAvatar(newAvatarLink.value, buttonElement);
  formNewAvatar.reset();
  closePopup(popupNewAvatar);
});

formEditProfile.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const {submitButtonSelector} = validationConfig;
  const buttonElement = formEditProfile.querySelector(submitButtonSelector);
  updateProfile(nameProfile.value, descriptionProfile.value, buttonElement)
  formEditProfile.reset();
  closePopup(popupProfileEdit);
});

enableValidation(validationConfig)

Promise.all([
  fetch(`${config.baseUrl}/users/me` , {headers: {authorization: config.headers.authorization}})
    .then((data)=>data.json()),
    
  fetch(`${config.baseUrl}/cards` , {headers: {authorization: config.headers.authorization}})
    .then((data)=>data.json())
])
    .then(([userData, cards]) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
      profileId = userData._id;
      cards.forEach((card) => {
        cardParams.placeName = card.name;
        cardParams.placeImg = card.link;
        cardParams.likeCounter = card.likes.length;
        cardParams.ownerId = card.owner._id;
        cardParams.likes = card.likes;
        cardParams.cardID = card._id;
        placesList.append(addCard(cardParams, profileId));
      })
    });  