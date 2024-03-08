import './pages/index.css';
import {createCard, popupDelete, cardIdForDelete, cardForRemove, handleResponse} from './components/card.js';
import {openPopup, closePopup} from './components/modal.js';
import {validationConfig} from './components/constants.js';
import {enableValidation, clearValidation} from './components/validation.js';
import {config, createNewCard, updateAvatar, updateProfile, deleteCard, likeCard, dislikeCard, getUsers, getCards} from './components/api.js'

const content = document.querySelector('.content');
const profileAvatar = content.querySelector('.profile__image');
const buttonNewPlace = content.querySelector('.profile__add-button');
const buttonProfileEdit = content.querySelector('.profile__edit-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popups = document.querySelectorAll('.popup')
const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupNewAvatar = document.querySelector('.popup_type_new-avatar')
const formEditProfile = document.forms['edit-profile'];
const formNewCard = document.forms['new-place'];
const formDelete = document.forms['delete'];
const formNewAvatar = document.forms['new-avatar'];
const newAvatarLink = formNewAvatar.elements.link;
const nameProfile = formEditProfile.elements.name;
const descriptionProfile = formEditProfile.elements.description;
const popupImage = document.querySelector('.popup_type_image');
const popupImageSrc = popupImage.querySelector('.popup__image');
const popupImageCpt = popupImage.querySelector('.popup__caption');
const profileTitle = content.querySelector('.profile__title');
const profileDescription = content.querySelector('.profile__description');
const placesList = content.querySelector('.places__list');
let profileId;

//Открытие popups
function handleCardClick(cardImage, cardTitle) {
  openPopup(popupImage);
  popupImageSrc.src = cardImage.src;
  popupImageSrc.alt = cardImage.alt;
  popupImageCpt.textContent = cardTitle.textContent;
};

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

//Отображение загрузки
function renderLoading(isLoading, buttonElement) {
  buttonElement.innerText = isLoading ? "Сохранение..." : "Сохранить";
};

//Закрытие popup по клику вне
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_is-opened') || (evt.target.classList.contains('popup__close'))) {
      closePopup(popup);
    };
});
});

//Отправка формы новой карточки
formNewCard.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const {submitButtonSelector} = validationConfig;
  const buttonElement = formNewCard.querySelector(submitButtonSelector);
  renderLoading(true, buttonElement);
  createNewCard(formNewCard.elements['place-name'].value, formNewCard.elements.link.value)
  .then(handleResponse)
  .then((data) => {placesList.prepend(createCard(data, profileId));})
  .catch((err) => {console.log(err);})
  .finally(() => {renderLoading(false, buttonElement);});
  formNewCard.reset();
  closePopup(popupNewCard);
});

//Отправка формы удаления карточки
formDelete.addEventListener('submit', function (evt) {
  evt.preventDefault();
  deleteCard(cardIdForDelete)
  .then(handleResponse)
  .then(() => {cardForRemove.remove();})
  .catch((err) => {console.log(err);});
  closePopup(popupDelete);
});

//Отправка формы новой аватарки
formNewAvatar.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const {submitButtonSelector} = validationConfig;
  const buttonElement = formNewAvatar.querySelector(submitButtonSelector);
  renderLoading(true, buttonElement);
  updateAvatar(newAvatarLink.value)
  .then(handleResponse)
  .then((data) => {profileAvatar.style.backgroundImage = `url(${data.avatar})`;})
  .catch((err) => {console.log(err);})
  .finally(() => {renderLoading(false, buttonElement);
  });
  formNewAvatar.reset();
  closePopup(popupNewAvatar);
});

//Отправка формы корректировки пользователя
formEditProfile.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const {submitButtonSelector} = validationConfig;
  const buttonElement = formEditProfile.querySelector(submitButtonSelector);
  renderLoading(true, buttonElement);
  updateProfile(nameProfile.value, descriptionProfile.value)
  .then(handleResponse)
  .then((data) => {
    profileTitle.textContent = data.name;
    profileDescription.textContent = data.about;
  })
  .catch((err) => {console.log(err);})
  .finally(() => {renderLoading(false, buttonElement);});
  formEditProfile.reset();
  closePopup(popupProfileEdit);
});

//Запуск валидации
enableValidation(validationConfig)

//Добавление пользователя и карточек при запуске
Promise.all([getUsers(), getCards()])
  .then(([userData, cards]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
    profileId = userData._id;
    cards.forEach((card) => {
      placesList.append(createCard(card, profileId));
    })
  });

  export {handleCardClick};