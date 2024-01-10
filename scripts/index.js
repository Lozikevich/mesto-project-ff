// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');
const formNewcard = document.querySelector('.popup_type_new-card');
const closeButton = formNewcard.querySelector('.popup__close');
const createButton = formNewcard.querySelector('.popup__button');

// @todo: Функция создания карточки
function addCard(placeName, placeImg, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = placeName;
  cardElement.querySelector('.card__image').src = placeImg;
  cardElement.querySelector('.card__like-button').addEventListener('click', function (evt) { 
    evt.target.classList.toggle('card__like-button_is-active');
  });
  cardElement.querySelector('.card__delete-button').addEventListener('click', function () {
    deleteCard(cardElement);
  });
  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(cardforRemove) {
  cardforRemove.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  placesList.append(addCard(card.name, card.link, deleteCard));
});