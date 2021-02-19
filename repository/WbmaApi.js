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

export {getMyInfo, logIn};
