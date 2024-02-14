import {formNewCard, formProfileEdit, formImage} from '../index.js';

function popupIsOpen(element) {
    element.classList.add('popup_is-opened');
    document.addEventListener('keydown', pressEsc);
};
  
function popupIsClose(element) {
    element.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', pressEsc);
};

function popupReset() {
    document.forms['edit-profile'].reset();
    document.forms['new-place'].reset();
};

function pressEsc(evt) {
    if (evt.key === 'Escape') {
        if (formImage.classList.contains('popup_is-opened')) {
            popupIsClose(formImage);
        } else if (formProfileEdit.classList.contains('popup_is-opened')) {
            popupIsClose(formProfileEdit);
            popupReset();
        } else if (formNewCard.classList.contains('popup_is-opened')) {
            popupIsClose(formNewCard);
            popupReset();
        };
    };
};

function overlayClick(evt) {
    if (evt.currentTarget === evt.target) {
        if (formImage.classList.contains('popup_is-opened')) {
            popupIsClose(formImage);
        } else if (formProfileEdit.classList.contains('popup_is-opened')) {
            popupIsClose(formProfileEdit);
            popupReset();
        } else if (formNewCard.classList.contains('popup_is-opened')) {
            popupIsClose(formNewCard);
            popupReset();
        };
    };
};

export {popupIsOpen, popupIsClose, popupReset, pressEsc, overlayClick};