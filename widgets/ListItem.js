import React, {useContext, useState, useEffect} from 'react';
import {Avatar, Button, Card, IconButton, Text} from 'react-native-paper';
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
import {baseUrl} from '../utils/variables';
const ListItem = ({singleMedia, navigation}) => {
  const {token} = useContext(AuthTokenContext);
  const {user} = useContext(UserInfoContext);

  const [owner, setOwner] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [favourite, setFavourite] = useState(null);
  const [favCount, setFavCount] = useState(null);
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
      setFavCount(favs.length);
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
      setFavCount(favCount + 1);
    } else {
      removeFromFavourite(singleMedia.file_id, token).then().catch();
      setFavCount(favCount - 1);
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
      <Card style={styles.container} elevation={4}
        onPress={() => {
          navigation.navigate('PlantDetailScreen', singleMedia);
        }}>
        <View style={styles.userInfo}>
          <Avatar.Image size={24} source={avatar} />
          <Text style={styles.username}>{owner.username}</Text>
        </View>
        <Card.Cover
          source={{
            uri: `${baseUrl}uploads/${thumbnail}`,
          }}
        />
        <Card.Actions style={styles.actions}>
          <Button
            icon={favIcon}
            color={favourite ? Colors.greenDark : 'grey'}
            size={20}
            onPress={setFav}
          >
            {favCount}
          </Button>
          <IconButton
            icon="comment-outline"
            color="grey"
            size={20}
            onPress={() =>
              navigation.navigate('CommentScreen', singleMedia.file_id)
            }
          />
          <IconButton icon="information-outline" color="grey" size={20} />
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
  navigation: PropTypes.object,
};

export default ListItem;
