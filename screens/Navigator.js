import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import FeedScreen from './FeedScreen';
import RegisterScreen from './RegisterScreen';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Feed">
        <Stack.Screen
          name="Feed"
          component={FeedScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

/* const StackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FeedScreen"
        component={FeedScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}; */

export default Navigator;
