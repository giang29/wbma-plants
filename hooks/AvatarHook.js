import {UserInfoContext} from '../context/UserInfoContext';
import {useContext} from 'react';
import {getAvatar} from '../repository/WbmaApi';

const getUserAvatar = () => {
  const {user, userImage, setUserImage} = useContext(UserInfoContext);

  if (Object.keys(userImage).length === 0) {
    getAvatar(user.user_id).then((a) => setUserImage(a));
  }

  return {userImage};
};

export default getUserAvatar;
