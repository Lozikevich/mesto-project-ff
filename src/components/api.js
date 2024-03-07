import {addCard, handleCardClick, popupDelete, cardIdForDelete, cardForRemove} from './card';

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-7',
    headers: {
      authorization: '1bbb74a8-881d-4910-bd79-a60878628ef3',
      'Content-Type': 'application/json'
    }
  };

const content = document.querySelector('.content');
const profileAvatar = document.querySelector('.profile__image');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const cardParams = {placeName: 'Name', placeImg: 'Link', likeCounter: 0, ownerId: null, likes: [], cardID: null, deleteCard, likeCard, handleCardClick};
const placesList = content.querySelector('.places__list');
let profileId;

const createNewCard = (name, link, buttonElement) => {
  renderLoading(true, buttonElement);
  fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(data => {
    if (data.ok) {return data.json();}
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((data) => {
    cardParams.placeName = data.name;
    cardParams.placeImg= data.link;
    cardParams.likes = data.likes;
    cardParams.cardID = data._id;
    cardParams.ownerId = data.owner._id;
    cardParams.likeCounter = 0;
    placesList.prepend(addCard(cardParams, profileId));
  })
  .catch((err) => {
    console.log(err); 
  })
  .finally(() => {
    renderLoading(false, buttonElement);
  });
};
  
const updateAvatar = (link, buttonElement) => {
  renderLoading(true, buttonElement);
  fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    })
  })
  .then(data => {
    if (data.ok) {return data.json();}
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((data) => {
    profileAvatar.style.backgroundImage = `url(${data.avatar})`;
  })
  .catch((err) => {
    console.log(err); 
  })
  .finally(() => {
    renderLoading(false, buttonElement);
  });
};
  
const updateProfile = (name, description, buttonElement) => {
  renderLoading(true, buttonElement);
  fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: description
    })
  })
  .then(data => {
    if (data.ok) {return data.json();}
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((data) => {
    profileTitle.textContent = data.name;
    profileDescription.textContent = data.about;
  })
  .catch((err) => {
    console.log(err); 
  })
  .finally(() => {
    renderLoading(false, buttonElement);
  });
};
  
function renderLoading(isLoading, buttonElement) {
  if (isLoading) {
    buttonElement.innerText = "Сохранение..."
  }
  else {
    buttonElement.innerText = "Сохранить"
  }
};

function deleteCard(cardID) {
  fetch(`${config.baseUrl}/cards/${cardID}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(data => {
    if (data.ok) {cardForRemove.remove();}
  })
  .catch((err) => {
    console.log(err); 
  })    
};

function likeCard(cardID, cardLikeButton, cardLikeCounter) {
  fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then(data => {
    if (data.ok) {return data.json();}
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((data) => {
    cardLikeCounter.textContent = data.likes.length;
    cardLikeButton.classList.add('card__like-button_is-active');
  })
  .catch((err) => {
    console.log(err); 
  })
};

function dislikeCard(cardID, cardLikeButton, cardLikeCounter) {
  fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(data => {
    if (data.ok) {return data.json();}
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((data) => {
    cardLikeCounter.textContent = data.likes.length;
    cardLikeButton.classList.remove('card__like-button_is-active');
  })
  .catch((err) => {
    console.log(err); 
  })
};

export {config, createNewCard, updateAvatar, updateProfile, renderLoading, profileAvatar, profileTitle, profileDescription, cardParams, placesList, content, profileId, deleteCard, likeCard, dislikeCard}