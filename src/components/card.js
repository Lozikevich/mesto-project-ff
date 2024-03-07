import { openPopup } from './modal.js';
import {likeCard, dislikeCard} from './api.js'
const cardTemplate = document.querySelector('#card-template').content;
const popupImage = document.querySelector('.popup_type_image');
const popupImageSrc = popupImage.querySelector('.popup__image');
const popupImageCpt = popupImage.querySelector('.popup__caption');
const popupDelete = document.querySelector('.popup_type_delete');
let cardIdForDelete;
let cardForRemove;


function handleCardClick(cardImage, cardTitle) {
  openPopup(popupImage);
  popupImageSrc.src = cardImage.src;
  popupImageSrc.alt = cardImage.alt;
  popupImageCpt.textContent = cardTitle.textContent;
};

function addCard({ placeImg, placeName, likeCounter, ownerId, likes, cardID, likeCard, handleCardClick}, profileID) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeCounter = cardElement.querySelector('.card__like-counter');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  cardTitle.textContent = placeName;
  cardImage.src = placeImg;
  cardImage.alt = "Фотография " + placeName;
  cardLikeCounter.textContent = likeCounter;
  
  if (likes.some(like => like._id === profileID)) {
    cardLikeButton.classList.add('card__like-button_is-active');
  };

  cardLikeButton.addEventListener('click', function() {
    if (cardLikeButton.classList.contains('card__like-button_is-active')) {
      dislikeCard(cardID, cardLikeButton, cardLikeCounter);
    }
    else {
      likeCard(cardID, cardLikeButton, cardLikeCounter);
    }
  });
  
  if (profileID === ownerId) {
    cardDeleteButton.addEventListener('click', function() {
      openPopup(popupDelete);
      cardIdForDelete = cardID;
      cardForRemove = cardElement;
    })
  }
  else {
    cardDeleteButton.remove();
  };

  cardImage.addEventListener('click', function() {
    handleCardClick(cardImage, cardTitle)
  });

  return cardElement;
};

export {addCard, handleCardClick, popupDelete, cardIdForDelete, cardForRemove};