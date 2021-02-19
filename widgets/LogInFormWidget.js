import React, {useContext, useState} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import useLogInForm from '../hooks/LoginHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, TextInput} from 'react-native-paper';
import {UserInfoContext} from '../context/UserInfoContext';
import {AuthTokenContext} from '../context/AuthTokenContext';
import {logIn} from '../repository/WbmaApi';
import validation from '../utils/validation';
import {validator} from '../utils/validator';
import TextInputWithErrorMessageWidget from './TextInpuWithErrorMessageWidget';

const LogInFormWidget = () => {
  const {handleInputChange, inputs} = useLogInForm();
  const {setUser} = useContext(UserInfoContext);
  const {setToken} = useContext(AuthTokenContext);
  const [errors, setErrors] = useState({
    username: null,
    password: null,
  });
  const doLogIn = () => {
    const emailError = validator('username', inputs.username, validation);
    const passwordError = validator('password', inputs.password, validation);
    setErrors({
      username: emailError,
      password: passwordError,
    });
    if (!(emailError || passwordError)) {
      logIn(inputs)
        .then((r) => {
          const token = r['token'];
          return AsyncStorage.setItem('userToken', token).then(() => r);
        })
        .then((r) => {
          setToken(r['token']);
          setUser(r['user']);
        });
    }
  };

  console.log(errors);
  return (
    <View style={{width: '100%'}}>
      <TextInputWithErrorMessageWidget
        errorMessage={errors.username}
        autoCapitalize="none"
        placeholder="Username"
        label="Username"
        mode="outlined"
        onChangeText={(txt) => handleInputChange('username', txt)}
      />
      <TextInputWithErrorMessageWidget
        errorMessage={errors.password}
        autoCapitalize="none"
        placeholder="Password"
        label="Password"
        mode="outlined"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
      />
      <Button mode="contained" onPress={doLogIn}>
        Log in
      </Button>
    </View>
  );
};

LogInFormWidget.propTypes = {
  navigation: PropTypes.object,
  onCreateAccountClick: PropTypes.func,
};

export default LogInFormWidget;
