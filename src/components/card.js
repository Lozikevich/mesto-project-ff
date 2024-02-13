function addCard(placeName, placeImg, deleteCard, likeCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__title').textContent = placeName;
    cardElement.querySelector('.card__image').src = placeImg;
    cardElement.querySelector('.card__image').alt = "Фотография " + placeName;
    cardElement.querySelector('.card__like-button').addEventListener('click', likeCard);
    cardElement.querySelector('.card__delete-button').addEventListener('click', function() {
      deleteCard(cardElement);
    });
    cardElement.querySelector('.card__image').addEventListener('click', function() {
      popupIsOpen(formImage);
      formImageSrc.src = placeImg;
      formImageCpt.textContent = placeName;
    });
    return cardElement;
};

function deleteCard(cardforRemove) {
    cardforRemove.remove();
};

function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
};

export {addCard, deleteCard, likeCard}
