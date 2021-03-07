import {baseUrl} from '../utils/variables';

// general function for fetching (options default value is empty object)
const doFetch = async (url, options = {}) => {
  const response = await fetch(url, options);
  const json = await response.json();
  if (json.error) {
    // if API response contains error message (use Postman for further details)
    throw new Error(json.message + ': ' + json.error);
  } else if (!response.ok) {
    // if API response does not contain error message, but there is other error
    throw new Error('doFetch failed');
  } else {
    // if all goes well
    return json;
  }
};

const useUser = () => {
  const postRegister = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    try {
      const json = await doFetch(baseUrl + 'users', fetchOptions);
      return json;
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const checkToken = async (token) => {
    try {
      const options = {
        method: 'GET',
        headers: {'x-access-token': token},
      };
      const userData = await doFetch(baseUrl + 'users/user', options);
      return userData;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getUser = async (id, token) => {
    try {
      const options = {
        method: 'GET',
        headers: {'x-access-token': token},
      };
      const userData = await doFetch(baseUrl + 'users/' + id, options);
      return userData;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const checkIsUserAvailable = async (username) => {
    try {
      const result = await doFetch(baseUrl + 'users/username/' + username);
      return result.available;
    } catch (error) {
      throw new Error('apihooks checkIsUserAvailable', error.message);
    }
  };

  return {postRegister, checkToken, checkIsUserAvailable, getUser};
};

const useTag = () => {
  const getFilesByTag = async (tag) => {
    try {
      const tagList = await doFetch(baseUrl + 'tags/' + tag);
      return tagList;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  const postTag = (tag, token) => {
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tag),
    };
    return fetch(baseUrl + 'tags', options).then((r) => r.json());
  };

  return {getFilesByTag, postTag};
};

const useMedia = () => {
  const upload = (fd, token) => {
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: fd,
    };
    return fetch(baseUrl + 'media', options)
        .then((r) => r.json());
  };

  const updateFile = async (fileId, fileInfo, token) => {
    const options = {
      method: 'PUT',
      headers: {
        'x-access-token': token,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(fileInfo),
    };
    try {
      const result = await doFetch(baseUrl + 'media/' + fileId, options);
      return result;
    } catch (error) {
      throw new Error('updateFile error: ' + error.message);
    }
  };

  const deleteFile = async (fileId, token) => {
    const options = {
      method: 'DELETE',
      headers: {'x-access-token': token},
    };
    try {
      const result = await doFetch(baseUrl + 'media/' + fileId, options);
      return result;
    } catch (error) {
      throw new Error('deleteFile error: ' + error.message);
    }
  };

  return {upload, updateFile, deleteFile};
};

export {useUser, useTag, useMedia};
