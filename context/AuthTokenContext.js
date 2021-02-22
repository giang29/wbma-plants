import React, {useState} from 'react';
import PropTypes from 'prop-types';

const AuthTokenContext = React.createContext(undefined);

const AuthTokenProvider = (props) => {
  const [token, setToken] = useState(undefined);

  return (
    <AuthTokenContext.Provider value={{token, setToken}}>
      {props.children}
    </AuthTokenContext.Provider>
  );
};

AuthTokenProvider.propTypes = {
  children: PropTypes.node,
};

export {AuthTokenContext, AuthTokenProvider};
