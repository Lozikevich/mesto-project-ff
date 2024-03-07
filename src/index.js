import initialCards from './components/cards.js';
import './pages/index.css';
import {addCard, deleteCard, likeCard, cardTemplate, handleCardClick, popupDelete, cardIdForDelete} from './components/card.js';
import {openPopup, closePopup} from './components/modal.js';
import {validationConfig} from './components/constants.js';

const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');
const buttonNewPlace = document.querySelector('.profile__add-button');
const buttonProfileEdit = document.querySelector('.profile__edit-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const cardParams = {placeName: 'Name', placeImg: 'Link', likeCounter: 0, ownerId: null, likes: [], cardID: null, deleteCard, likeCard, handleCardClick};
const popups = document.querySelectorAll('.popup')
const formEditProfile = document.forms['edit-profile'];
const formNewCard = document.forms['new-place'];
const formDelete = document.forms['delete'];
const nameProfile = formEditProfile.elements.name;
const descriptionProfile = formEditProfile.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');
const pencilIcone = document.querySelector('.pencil-icon');
const profileAvatarOverlay = document.querySelector('.profile__overlay');
let profileId;



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

profileAvatar.addEventListener('mouseover', function() {
  pencilIcone.classList.add('pencil-icon-visible');
  profileAvatarOverlay.classList.add('profile__overlay-visible');
});

profileAvatar.addEventListener('mouseout', function() {
  pencilIcone.classList.remove('pencil-icon-visible');
  profileAvatarOverlay.classList.remove('profile__overlay-visible');
})

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

const createNewCard = (name, link) => {
  fetch('https://nomoreparties.co/v1/wff-cohort-7/cards', {
    method: 'POST',
    headers: {
      authorization: '1bbb74a8-881d-4910-bd79-a60878628ef3',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then((data)=>data.json())
  .then((data) => {
    cardParams.placeName = data.name;
    cardParams.placeImg= data.link;
    cardParams.likes = data.likes;
    cardParams.cardID = data._id;
    cardParams.ownerId = data.owner._id;
    cardParams.likeCounter = 0;
    placesList.prepend(addCard(cardParams, profileId));
  })
};

formNewCard.addEventListener('submit', function (evt) {
  evt.preventDefault();
  createNewCard(formNewCard.elements['place-name'].value, formNewCard.elements.link.value);
  formNewCard.reset();
  closePopup(popupNewCard);
});

formDelete.addEventListener('submit', function (evt) {
  evt.preventDefault();
  deleteCard(cardIdForDelete);
  closePopup(popupDelete);
});

const updateProfile = (name, description) => {
  fetch('https://nomoreparties.co/v1/wff-cohort-7/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '1bbb74a8-881d-4910-bd79-a60878628ef3',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      about: description
    })
  })
  .then((data)=>data.json())
  .then((data) => {
    profileTitle.textContent = data.name;
    profileDescription.textContent = data.about;
  })
};

formEditProfile.addEventListener('submit', function (evt) {
  evt.preventDefault();
  updateProfile(nameProfile.value, descriptionProfile.value)
  formEditProfile.reset();
  closePopup(popupProfileEdit);
});

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    if (inputElement.validity.valueMissing) {
      showInputError(formElement, inputElement, inputElement.dataset.errorRequired);
    }
    else if (inputElement.validity.typeMismatch) {
      showInputError(formElement, inputElement, inputElement.dataset.errorType);
    }
    else if (inputElement.validity.patternMismatch) {
      showInputError(formElement, inputElement, inputElement.dataset.errorPattern);
    }
  else {
    hideInputError(formElement, inputElement);
  }
}};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

const enableValidation = (validationConfig) => {
  const {formSelector, ...formConfig} = validationConfig;
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, formConfig);
  });
};

const toggleButtonState = (inputList, buttonElement, restConfig) => {
  const {inactiveButtonClass} = restConfig;
  if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(inactiveButtonClass);
  } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(inactiveButtonClass);
  }
};

const setEventListeners = (formElement, formConfig) => {
  const {inputSelector, submitButtonSelector, ...restConfig} = formConfig;
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, restConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement, restConfig);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
  })
};

const clearValidation = (form, validationConfig) => {
    const {inputSelector, submitButtonSelector, ...restConfig} = validationConfig;
    const inputList = Array.from(form.querySelectorAll(inputSelector));
    const buttonElement = form.querySelector(submitButtonSelector);
    inputList.forEach((inputElement) => {
      hideInputError(form, inputElement);
    });
    toggleButtonState(inputList, buttonElement, restConfig);
  };

enableValidation(validationConfig)

Promise.all([
  fetch('https://nomoreparties.co/v1/wff-cohort-7/users/me' , {
    headers: {
      authorization: '1bbb74a8-881d-4910-bd79-a60878628ef3'
    }})
    .then((data)=>data.json()),
  fetch('https://nomoreparties.co/v1/wff-cohort-7/cards' , {
    headers: {
      authorization: '1bbb74a8-881d-4910-bd79-a60878628ef3'
    }})
    .then((data)=>data.json())])
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

      
