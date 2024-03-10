const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-7',
    headers: {
      authorization: '1bbb74a8-881d-4910-bd79-a60878628ef3',
      'Content-Type': 'application/json'
    }
  };

function handleResponse(data) {
  if (data.ok) {return data.json();}
  return Promise.reject(`Ошибка: ${res.status}`);
};

const createNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(handleResponse)
};

function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
};
  
const updateAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link
    })
  })
  .then(handleResponse)
};
  
const updateProfile = (name, description) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: description
    })
  })
  .then(handleResponse)
};

function likeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(handleResponse)
};

function dislikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(handleResponse)
};

function getUser() {
  return fetch(`${config.baseUrl}/users/me` , {headers: {authorization: config.headers.authorization}})
  .then(handleResponse)
};

function getCards() {
  return fetch(`${config.baseUrl}/cards` , {headers: {authorization: config.headers.authorization}})
  .then(handleResponse)
};

export {config, createNewCard, updateAvatar, updateProfile, deleteCard, likeCard, dislikeCard, getUser, getCards}