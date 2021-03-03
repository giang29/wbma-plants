import React, {useContext} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import PropTypes from 'prop-types';
import {Colors} from '../styles/Colors';
import TextInputWithErrorMessageWidget from '../widgets/TextInpuWithErrorMessageWidget';
import useSignupForm from '../hooks/RegisterHooks';
import {logIn, register} from '../repository/WbmaApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserInfoContext} from '../context/UserInfoContext';
import {AuthTokenContext} from '../context/AuthTokenContext';

const RegisterScreen = ({navigation}) => {
  const {handleInputChange, inputs} = useSignupForm();
  const {setUser} = useContext(UserInfoContext);
  const {setToken} = useContext(AuthTokenContext);

  const doRegister = () => {
    register(inputs)
      .then(() => logIn({username: inputs.username, password: inputs.password}))
      .then((r) => {
        const token = r['token'];
        if (token == null) return;
        return AsyncStorage.setItem('userToken', token).then(() => {
          setToken(r['token']);
          setUser(r['user']);
        });
      });
  };
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/ic-plant.png')} />
      <TextInputWithErrorMessageWidget
        style={styles.textField}
        autoCapitalize="none"
        placeholder="Username"
        theme={{
          colors: {
            label: Colors.greenDark,
            primary: Colors.greenDark,
          },
        }}
        errorMessage={null}
        onChangeText={(txt) => handleInputChange('username', txt)}
        label="Username"
        mode="outlined"
      />
      <TextInputWithErrorMessageWidget
        style={styles.textField}
        autoCapitalize="none"
        placeholder="E-mail"
        label="E-mail"
        errorMessage={null}
        theme={{
          colors: {
            label: Colors.greenDark,
            primary: Colors.greenDark,
          },
        }}
        mode="outlined"
        onChangeText={(txt) => handleInputChange('email', txt)}
      />
      <TextInputWithErrorMessageWidget
        style={styles.textField}
        autoCapitalize="none"
        placeholder="Password"
        errorMessage={null}
        theme={{
          colors: {
            label: Colors.greenDark,
            primary: Colors.greenDark,
          },
        }}
        label="Password"
        mode="outlined"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
      />
      <TextInputWithErrorMessageWidget
        style={styles.textField}
        autoCapitalize="none"
        errorMessage={null}
        placeholder="Confirm password"
        theme={{
          colors: {
            label: Colors.greenDark,
            primary: Colors.greenDark,
          },
        }}
        label="Confirm password"
        mode="outlined"
        onChangeText={(txt) => handleInputChange('confirmPassword', txt)}
        secureTextEntry={true}
      />
      <Button
        mode="contained"
        onPress={doRegister}
        style={styles.button}
        labelStyle={{color: 'white'}}
      >
        Sign up
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('LoginScreen')}
        style={styles.secondaryButton}
        labelStyle={{color: Colors.greenDark}}
      >
        Already has an account?
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

RegisterScreen.propTypes = {
  navigation: PropTypes.object,
};

export default RegisterScreen;
