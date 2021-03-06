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
import {Colors} from '../styles/Colors';

const LogInFormWidget = ({navigation}) => {
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
        if (token == null) return;
        return AsyncStorage.setItem('userToken', token).then(() => {
          setToken(r['token']);
          setUser(r['user']);
        });
      });
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/ic-plant.png')} />
      <TextInputWithErrorMessageWidget
        style={styles.textField}
        theme={{
          colors: {
            label: Colors.greenDark,
            primary: Colors.greenDark,
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
            label: Colors.greenDark,
            primary: Colors.greenDark,
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
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
        style={styles.secondaryButton}
        labelStyle={{color: Colors.greenDark}}
      >
        Create an account
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.greenLight,
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
    backgroundColor: Colors.greenDark,
  },
  secondaryButton: {
    marginTop: 16,
    marginStart: 16,
    marginEnd: 16,
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
