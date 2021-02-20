import React from 'react';
import ContextWrapper from './context/ContextWrapper';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import RootScreen from './screens/RootScreen';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#b1f0b7',
    accent: '#219653',
  },
};

const App = () => {
  return (
    <ContextWrapper>
      <PaperProvider theme={theme}>
        <RootScreen />
      </PaperProvider>
    </ContextWrapper>
  );
};

export default App;
