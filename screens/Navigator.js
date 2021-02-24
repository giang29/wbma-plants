import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import FeedScreen from './FeedScreen';
import MenuScreen from './MenuScreen';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

const slideAnimation = ({current, layouts}) => {
  return {
    cardStyle: {
      transform: [
        {
          translateX: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [-layouts.screen.width, 0],
          }),
        },
      ],
    },
  };
};

const StackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FeedScreen"
        component={FeedScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MenuScreen"
        component={MenuScreen}
        options={{headerShown: false, cardStyleInterpolator: slideAnimation}}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
