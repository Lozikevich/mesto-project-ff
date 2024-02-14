import initialCards from './components/cards.js';
import './pages/index.css';
import {addCard, deleteCard, likeCard} from './components/card.js';
import {popupIsOpen, popupIsClose, popupReset, overlayClick} from './components/modal.js';

const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');
const buttonNewPlace = document.querySelector('.profile__add-button');
const formNewCard = document.querySelector('.popup_type_new-card');
const closeFormNewCard = formNewCard.querySelector('.popup__close');
const submitFormNewCard = formNewCard.querySelector('.popup__button');
const buttonProfileEdit = document.querySelector('.profile__edit-button');
const formProfileEdit = document.querySelector('.popup_type_edit');
const submitFormProfile = formProfileEdit.querySelector('.popup__button');
const closeFormProfile = formProfileEdit.querySelector('.popup__close');
const formImage = document.querySelector('.popup_type_image');
const closeFormImage = formImage.querySelector('.popup__close');
const cardTemplate = document.querySelector('#card-template').content;
const formImageSrc = formImage.querySelector('.popup__image');
const formImageCpt = formImage.querySelector('.popup__caption');

initialCards.forEach((card) => {
  placesList.append(addCard(card.name, card.link, deleteCard, likeCard));
});

formImage.addEventListener('click', function (evt) {
  overlayClick(evt);
});

buttonNewPlace.addEventListener('click', function () {
  popupIsOpen(formNewCard);
});

closeFormNewCard.addEventListener('click', function () {
  popupIsClose(formNewCard);
  popupReset();
});

formNewCard.addEventListener('click', function (evt) {
  overlayClick(evt);
});

submitFormNewCard.addEventListener('click', function (evt) {
  evt.preventDefault();
  const form = document.forms['new-place'];
  const name = form.elements['place-name'].value;
  const link = form.elements.link.value;
  placesList.prepend(addCard(name, link, deleteCard, likeCard));
  popupIsClose(formNewCard);
  popupReset();
});

buttonProfileEdit.addEventListener('click', function () {
  popupIsOpen(formProfileEdit);
  const form = document.forms['edit-profile'];
  const name = form.elements.name;
  const description = form.elements.description;
  name.placeholder = document.querySelector('.profile__title').textContent;
  description.placeholder =document.querySelector('.profile__description').textContent;
});

closeFormProfile.addEventListener('click', function () {
  popupIsClose(formProfileEdit);
  popupReset();
});

formProfileEdit.addEventListener('click', function (evt) {
  overlayClick(evt);
});

submitFormProfile.addEventListener('click', function (evt) {
  evt.preventDefault();
  const form = document.forms['edit-profile'];
  const name = form.elements.name;
  const description = form.elements.description;
  document.querySelector('.profile__title').textContent = name.value;
  document.querySelector('.profile__description').textContent = description.value;
  popupIsClose(formProfileEdit);
  popupReset();
});

closeFormImage.addEventListener('click', function () {
  popupIsClose(formImage);
  popupReset();
});

export {formNewCard, formProfileEdit, formImage, formImageSrc, formImageCpt, cardTemplate};