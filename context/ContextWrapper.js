import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {AuthTokenProvider} from './AuthTokenContext';
import {UserInfoProvider} from './UserInfoContext';

const ContextWrapper = (props) => {
  const [user, setUser] = useState({});

  return (
    <AuthTokenProvider value={[user, setUser]}>
      <UserInfoProvider>{props.children}</UserInfoProvider>
    </AuthTokenProvider>
  );
};

ContextWrapper.propTypes = {
  children: PropTypes.node,
};

export default ContextWrapper;
