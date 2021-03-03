import React from 'react';
import {StyleSheet, Platform, KeyboardAvoidingView} from 'react-native';
import LogInFormWidget from '../widgets/LogInFormWidget';
import PropTypes from 'prop-types';

const LoginScreen = ({navigation}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <LogInFormWidget navigation={navigation} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

LoginScreen.propTypes = {
  navigation: PropTypes.object,
};

export default LoginScreen;
