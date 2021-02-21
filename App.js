import React from 'react';
import ContextWrapper from './context/ContextWrapper';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import RootScreen from './screens/RootScreen';
import {Colors} from './styles/Colors';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.greenLight,
    accent: Colors.greenDark,
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
