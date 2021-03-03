/* eslint-disable indent */
const url = 'http://media.mw.metropolia.fi/wbma/';

const getMyInfo = (userToken) => {
  return fetch(`${url}users/user`, {
    headers: {
      'x-access-token': userToken,
    },
  }).then((r) => r.json());
};

const logIn = (inputs) => {
  let formBody = [];
  // eslint-disable-next-line guard-for-in
  for (const property in inputs) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(inputs[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');
  return fetch(`${url}login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: formBody,
  }).then((r) => r.json());
};

const getPosts = () => {
  return fetch(`${url}tags/wbma-plants-2021`).then((r) => r.json());
};

const getAvatar = (userId) => {
  return fetch(`${url}tags/wbma-plants-2021-profile-picture:${userId}`)
    .then((r) => r.json())
    .then((r) => {
      if (r[0]) {
        return {uri: r[0]};
      } else {
        return require('../assets/ic-avatar.png');
      }
    });
};

const getMedia = (fileId) => {
  return fetch(`${url}media/${fileId}`).then((r) => r.json());
};

const getUserInfo = (userToken, userId) => {
  return fetch(`${url}users/${userId}`, {
    headers: {
      'x-access-token': userToken,
    },
  }).then((r) => r.json());
};

export {getMyInfo, logIn, getPosts, getUserInfo, getMedia, getAvatar};
