import { openPopup } from './modal.js';
import {likeCard, dislikeCard} from './api.js';
import {handleCardClick} from '../index.js';
const cardTemplate = document.querySelector('#card-template').content;
const popupDelete = document.querySelector('.popup_type_delete');
let cardIdForDelete;
let cardForRemove;

//Функция создания карточки
function createCard(card, profileID) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeCounter = cardElement.querySelector('.card__like-counter');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  cardTitle.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = "Фотография " + card.name;
  cardLikeCounter.textContent = card.likes.length;
  
  if (card.likes.some(like => like._id === profileID)) {
    cardLikeButton.classList.add('card__like-button_is-active');
  };

  cardLikeButton.addEventListener('click', function() {
    if (cardLikeButton.classList.contains('card__like-button_is-active')) {
      dislikeCard(card._id)
      .then((card) => {
        cardLikeCounter.textContent = card.likes.length;
        cardLikeButton.classList.remove('card__like-button_is-active');
      })
      .catch((err) => {console.log(err);});
    }
    else {
      likeCard(card._id)
      .then((card) => {
        cardLikeCounter.textContent = card.likes.length;
        cardLikeButton.classList.add('card__like-button_is-active');
      })
      .catch((err) => {console.log(err);});
    }
  });
  
  if (profileID === card.owner._id) {
    cardDeleteButton.addEventListener('click', function() {
      openPopup(popupDelete);
      cardIdForDelete = card._id;
      cardForRemove = cardElement;
    });
  }
  else {
    cardDeleteButton.remove();
  };

  cardImage.addEventListener('click', function() {
    handleCardClick(cardImage, cardTitle)
  });

  return cardElement;
};

export {createCard, popupDelete, cardIdForDelete, cardForRemove};