const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-7',
    headers: {
      authorization: '1bbb74a8-881d-4910-bd79-a60878628ef3',
      'Content-Type': 'application/json'
    }
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
};

function deleteCard(cardID) {
  return fetch(`${config.baseUrl}/cards/${cardID}`, {
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
};

function likeCard(cardID) {
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: 'PUT',
    headers: config.headers
  })
};

function dislikeCard(cardID) {
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: 'DELETE',
    headers: config.headers
  })
};

function getUsers() {
  return fetch(`${config.baseUrl}/users/me` , {headers: {authorization: config.headers.authorization}})
    .then((res)=>res.json());
};

function getCards() {
  return fetch(`${config.baseUrl}/cards` , {headers: {authorization: config.headers.authorization}})
    .then((res)=>res.json());
};

export {config, createNewCard, updateAvatar, updateProfile, deleteCard, likeCard, dislikeCard, getUsers, getCards}