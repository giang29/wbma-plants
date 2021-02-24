import React, {useState} from 'react';
import PropTypes from 'prop-types';

const UserInfoContext = React.createContext({});

const UserInfoProvider = (props) => {
  const [user, setUser] = useState({});
  const [userImage, setUserImage] = useState({});

  return (
    <UserInfoContext.Provider value={{user, setUser, userImage, setUserImage}}>
      {props.children}
    </UserInfoContext.Provider>
  );
};

UserInfoProvider.propTypes = {
  children: PropTypes.node,
};

export {UserInfoContext, UserInfoProvider};
