/* eslint-disable indent */
import {appIdentifier} from '../utils/variables';

const url = 'https://media-new.mw.metropolia.fi/wbma/';

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

const register = ({username, password, email}) => {
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
      email: email,
    }),
  };
  return fetch(url + 'users', fetchOptions).then((r) => r.json());
};

const getPosts = () => {
  return fetch(`${url}tags/${appIdentifier}`).then((r) => r.json());
};

const getAvatar = (userId) => {
  return fetch(`${url}tags/wbma-plants-2021-profile-picture:${userId}`)
    .then((r) => r.json())
    .then((r) => {
      if (r[0]) {
        return {uri: `${url}uploads/${r[0].filename}`};
      } else {
        return require('../assets/ic-avatar.png');
      }
    });
};

const getCover = (userId) => {
  return fetch(`${url}tags/wbma-plants-2021-cover-picture:${userId}`)
    .then((r) => r.json())
    .then((r) => {
      if (r[0]) {
        return {uri: `${url}uploads/${r[0].filename}`};
      } else {
        return require('../assets/img-cover.jpg');
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

const addToFavourite = (fileId, userToken) => {
  return fetch(`${url}favourites`, {
    method: 'POST',
    headers: {
      'x-access-token': userToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({file_id: fileId}),
  });
};

const removeFromFavourite = (fileId, userToken) => {
  return fetch(`${url}favourites/file/${fileId}`, {
    method: 'DELETE',
    headers: {
      'x-access-token': userToken,
    },
  });
};

const getMyMedia = (userToken) => {
  return fetch(`${url}media/user`, {
    headers: {
      'x-access-token': userToken,
    },
  }).then((r) => r.json());
};

const getFavourites = (userToken) => {
  return fetch(`${url}favourites`, {
    headers: {
      'x-access-token': userToken,
    },
  })
    .then((r) => r.json())
    .then((r) => r.map((f) => f.file_id));
};

const getFavouritesOfFile = (fileId) => {
  return fetch(`${url}favourites/file/${fileId}`)
    .then((r) => r.json())
    .then((r) => r.map((f) => f.user_id));
};

const searchItems = (searchTerm, userToken) => {
  return fetch(`${url}media/search`, {
    method: 'POST',
    headers: {
      'x-access-token': userToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({title: searchTerm, description: searchTerm}),
  }).then((r) => r.json());
};

const getComments = (fileId, userToken) => {
  return fetch(`${url}comments/file/${fileId}`)
    .then((r) => r.json())
    .then((c) => {
      const users = [...new Set(c.map((i) => i.user_id))];
      return Promise.all(
        users.map((u) => {
          return Promise.all([getUserInfo(userToken, u), getAvatar(u)]).then(
            ([user, avatar]) => {
              return Promise.resolve({
                userId: u,
                username: user.username,
                avatar: avatar,
              });
            },
          );
        }),
      )
        .then((objects) => {
          const map = new Map();
          objects.forEach((obj) => map.set(obj.userId, obj));
          return map;
        })
        .then((map) => {
          return c.map((i) => {
            return {
              comment: i.comment,
              username: map.get(i.user_id).username,
              avatar: map.get(i.user_id).avatar,
              commentId: i.comment_id,
            };
          });
        });
    });
};

const addComment = (userToken, fileId, comment) => {
  return fetch(`${url}comments`, {
    method: 'POST',
    headers: {
      'x-access-token': userToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({file_id: fileId, comment: comment}),
  }).then((r) => r.json());
};

const belongToPlants = (fileId) => {
  return fetch(`${url}tags/file/${fileId}`)
    .then((r) => r.json())
    .then((r) => r.map((i) => i.tag).includes(appIdentifier));
};

export {
  getMyInfo,
  logIn,
  getPosts,
  getUserInfo,
  getMedia,
  getAvatar,
  addToFavourite,
  removeFromFavourite,
  getFavourites,
  getFavouritesOfFile,
  searchItems,
  getComments,
  addComment,
  register,
  getCover,
  getMyMedia,
  belongToPlants,
};
