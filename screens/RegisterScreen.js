import React from 'react';
import {View} from 'react-native';
import {Button, Input} from 'react-native-paper';
import PropTypes from 'prop-types';

const RegisterScreen = ({navigation}) => {
  const {handleInputChange, handleInputEnd} = useSignUpForm();

  const doRegister = () => {
    return (
      <View>
        <Input
          autoCapitalize="none"
          placeholder="username"
          onChangeText={(txt) => handleInputChange('username', txt)}
          onEndEditing={(event) => {
            handleInputEnd('username', event.nativeEvent.text);
          }}
          errorMessage={registerErrors.username}
        />
        <Input
          autoCapitalize="none"
          placeholder="password"
          onChangeText={(txt) => handleInputChange('password', txt)}
          secureTextEntry={true}
        />
        <Input
          autoCapitalize="none"
          placeholder="confirm password"
          onChangeText={(txt) => handleInputChange('confirmPassword', txt)}
          secureTextEntry={true}
        />
        <Input
          autoCapitalize="none"
          placeholder="email"
          onChangeText={(txt) => handleInputChange('email', txt)}
        />
        <Input
          autoCapitalize="none"
          placeholder="full name"
          onChangeText={(txt) => handleInputChange('full_name', txt)}
        />
        <Button title="Register!" onPress={doRegister} />
      </View>
    );
  };
};

RegisterScreen.propTypes = {
  navigation: PropTypes.object,
};

export default RegisterScreen;
