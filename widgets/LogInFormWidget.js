import React, {useContext, useState} from 'react';
import {Image, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import useLogInForm from '../hooks/LoginHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-paper';
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
      logIn(inputs).then((r) => {
        const token = r['token'];
        return AsyncStorage.setItem('userToken', token).then(() => {
          setToken(r['token']);
          setUser(r['user']);
        });
      });
    }
  };

  console.log(errors);
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{uri: require('../assets/ic-leaf.png')}}
      />
      <TextInputWithErrorMessageWidget
        style={styles.textField}
        theme={{
          colors: {
            label: '#219653',
            primary: '#219653',
          },
        }}
        errorMessage={errors.username}
        autoCapitalize="none"
        placeholder="Username"
        label="Username"
        mode="outlined"
        onChangeText={(txt) => handleInputChange('username', txt)}
      />
      <TextInputWithErrorMessageWidget
        style={styles.textField}
        errorMessage={errors.password}
        autoCapitalize="none"
        placeholder="Password"
        label="Password"
        mode="outlined"
        theme={{
          colors: {
            label: '#219653',
            primary: '#219653',
          },
        }}
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
      />
      <Button
        mode="contained"
        onPress={doLogIn}
        style={styles.button}
        labelStyle={{color: 'white'}}
      >
        Log in
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#b1f0b7',
    justifyContent: 'center',
  },
  textField: {
    marginTop: 16,
    marginStart: 16,
    marginEnd: 16,
  },
  button: {
    marginTop: 16,
    marginStart: 16,
    marginEnd: 16,
    backgroundColor: '#219653',
  },
  logo: {
    marginTop: 16,
    width: 128,
    height: 128,
    alignSelf: 'center',
  },
});

LogInFormWidget.propTypes = {
  navigation: PropTypes.object,
  onCreateAccountClick: PropTypes.func,
};

export default LogInFormWidget;
