import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import FeedScreen from './FeedScreen';
import MenuScreen from './MenuScreen';
import SearchScreen from './SearchScreen';
import CommentScreen from './CommentScreen';
import ProfileScreen from './ProfileScreen';
import UploadScreen from './UploadScreen';
import PlantDetailScreen from './PlantDetailScreen';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

const menuSlideAnimation = ({current, layouts}) => {
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
const slideAnimation = ({current, layouts}) => {
  return {
    cardStyle: {
      transform: [
        {
          translateX: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.width, 0],
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
        options={{
          headerShown: false,
          cardStyleInterpolator: menuSlideAnimation,
        }}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{headerShown: false, cardStyleInterpolator: slideAnimation}}
      />
      <Stack.Screen
        name="CommentScreen"
        component={CommentScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{headerShown: false, cardStyleInterpolator: slideAnimation}}
      />
      <Stack.Screen
        name="UploadScreen"
        component={UploadScreen}
        options={{headerShown: false, cardStyleInterpolator: slideAnimation}}
      />
      <Stack.Screen
        name="PlantDetailScreen"
        component={PlantDetailScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
