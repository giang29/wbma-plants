import React, {useState} from 'react';
import PropTypes from 'prop-types';

const UserInfoContext = React.createContext({});

const UserInfoProvider = (props) => {
  const [user, setUser] = useState({});

  return (
    <UserInfoContext.Provider value={{user, setUser}}>
      {props.children}
    </UserInfoContext.Provider>
  );
};

UserInfoProvider.propTypes = {
  children: PropTypes.node,
};

export {UserInfoContext, UserInfoProvider};
