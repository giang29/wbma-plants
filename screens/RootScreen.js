import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthTokenContext} from '../context/AuthTokenContext';
import {getMyInfo} from '../repository/WbmaApi';
import {UserInfoContext} from '../context/UserInfoContext';
import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';

const RootScreen = () => {
  const viewState = rootScreenEffect([]);

  let view;

  switch (viewState) {
    case IN_PROGRESS:
      view = <SplashScreen />;
      break;
    case TOKEN_INVALID:
      view = <LoginScreen />;
      break;
    default:
      view = <SplashScreen />; // whenever the stack is ready, replace this
  }

  return view;
};

const IN_PROGRESS = 0;
const TOKEN_VALID = 1;
const TOKEN_INVALID = 2;

const rootScreenEffect = (deps) => {
  const {token, setToken} = useContext(AuthTokenContext);
  const {setUser} = useContext(UserInfoContext);

  const [viewState, setViewState] = useState(IN_PROGRESS);

  useEffect(() => {
    AsyncStorage.getItem('userToken')
      .then((userToken) => {
        if (userToken != null) {
          return getMyInfo(userToken).then((user) => {
            setToken(userToken);
            setUser(user);
          });
        } else {
          setToken(null);
          return Promise.resolve();
        }
      })
      .catch(() => setToken(null));
  }, deps);

  useEffect(() => {
    if (token === null) {
      setViewState(TOKEN_INVALID);
    } else {
      setViewState(TOKEN_VALID);
    }
  }, [token]);
  return viewState;
};

export default RootScreen;
