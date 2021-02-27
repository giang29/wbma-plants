import React, {useContext, useState, useEffect} from 'react';
import {Avatar, Card, IconButton, Text} from 'react-native-paper';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {Colors} from '../styles/Colors';
import {
  addToFavourite,
  getAvatar,
  getFavouritesOfFile,
  getMedia,
  getUserInfo,
  removeFromFavourite,
} from '../repository/WbmaApi';
import {AuthTokenContext} from '../context/AuthTokenContext';
import {UserInfoContext} from '../context/UserInfoContext';
const ListItem = ({singleMedia}) => {
  const {token} = useContext(AuthTokenContext);
  const {user} = useContext(UserInfoContext);

  const [owner, setOwner] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [favourite, setFavourite] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const loadOwner = () => {
    let userPromise;
    if (singleMedia.user_id === user.user_id) {
      userPromise = Promise.resolve(user);
    } else {
      userPromise = getUserInfo(token, singleMedia.user_id);
    }
    userPromise.then((u) => setOwner(u));
  };

  const loadOwnerAvatar = () => {
    getAvatar(singleMedia.user_id).then((a) => setAvatar(a));
  };

  const loadFavourite = () => {
    getFavouritesOfFile(singleMedia.file_id).then((favs) => {
      setFavourite(favs.includes(user.user_id));
    });
  };

  const loadThumbnail = () => {
    getMedia(singleMedia.file_id).then((file) => {
      setThumbnail(file.thumbnails.w160);
    });
  };

  const setFav = () => {
    if (!favourite) {
      addToFavourite(singleMedia.file_id, token).then().catch();
    } else {
      removeFromFavourite(singleMedia.file_id, token).then().catch();
    }
    setFavourite(!favourite);
  };

  useEffect(() => {
    loadOwner();
    loadOwnerAvatar();
    loadFavourite();
    loadThumbnail();
  }, []);

  const favIcon = favourite ? 'heart' : 'heart-outline';
  let view;
  if (
    owner == null ||
    avatar == null ||
    favourite == null ||
    thumbnail == null
  ) {
    view = <></>;
  } else {
    view = (
      <Card style={styles.container} elevation={4}>
        <View style={styles.userInfo}>
          <Avatar.Image size={24} source={avatar} />
          <Text style={styles.username}>{owner.username}</Text>
        </View>
        <Card.Cover
          source={{
            uri: `http://media.mw.metropolia.fi/wbma/uploads/${thumbnail}`,
          }}
        />
        <Card.Actions style={styles.actions}>
          <IconButton
            icon={favIcon}
            color={Colors.greenDark}
            size={20}
            onPress={setFav}
          />
          <IconButton
            icon="comment-outline"
            color={Colors.greenDark}
            size={20}
          />
          <IconButton
            icon="information-outline"
            color={Colors.greenDark}
            size={20}
          />
        </Card.Actions>
      </Card>
    );
  }
  return view;
};

const styles = StyleSheet.create({
  username: {
    marginStart: 8,
  },
  container: {
    marginStart: 16,
    marginEnd: 16,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 8,
  },
  userInfo: {
    padding: 16,
    flex: 1,
    flexDirection: 'row',
  },
  actions: {
    flex: 1,
    justifyContent: 'space-around',
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.shape({
    file_id: PropTypes.number,
    user_id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    filename: PropTypes.string,
  }),
};

export default ListItem;
