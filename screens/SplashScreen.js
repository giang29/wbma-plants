import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import {Colors} from '../styles/Colors';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.greenDark} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.greenLight,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
});

export default SplashScreen;
