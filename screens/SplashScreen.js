import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#219653" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b1f0b7',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
});

export default SplashScreen;
