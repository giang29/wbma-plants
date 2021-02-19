import React from 'react';
import ContextWrapper from './context/ContextWrapper';
import RootScreen from './screens/RootScreen';

const App = () => {
  return (
    <ContextWrapper>
      <RootScreen />
    </ContextWrapper>
  );
};

export default App;
