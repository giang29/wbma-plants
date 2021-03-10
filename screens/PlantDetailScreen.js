import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import {baseUrl} from '../utils/variables';
import {AuthTokenContext} from '../context/AuthTokenContext';
import ToolbarWidget from '../widgets/ToolbarWidget';
import {Colors} from '../styles/Colors';
import {
  addToFavourite, deleteMedia,
  getAvatar, getComments,
  getFavouritesOfFile,
  getUserInfo,
  removeFromFavourite,
} from '../repository/WbmaApi';
import {UserInfoContext} from '../context/UserInfoContext';
import {IconButton, Text, TextInput} from 'react-native-paper';
import AvatarImage from 'react-native-paper/src/components/Avatar/AvatarImage';
import CommentItem from '../widgets/CommentItem';

const PlantDetailScreen = ({navigation, route}) => {
  const media = route.params;
  const {token} = useContext(AuthTokenContext);
  const [owner, setOwner] = useState({});
  const [comment, setComment] = useState(null);
  const [avatar, setAvatar] = useState(require('../assets/ic-avatar.png'));
  const [favourite, setFavourite] = useState(false);
  const [favCount, setFavCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  const {user} = useContext(UserInfoContext);

  const loadOwner = () => {
    let userPromise;
    if (media.user_id === user.user_id) {
      userPromise = Promise.resolve(user);
    } else {
      userPromise = getUserInfo(token, media.user_id);
    }
    userPromise.then((u) => setOwner(u));
  };

  const loadOwnerAvatar = () => {
    getAvatar(media.user_id).then((a) => setAvatar(a));
  };

  const loadFavourite = () => {
    getFavouritesOfFile(media.file_id).then((favs) => {
      setFavourite(favs.includes(user.user_id));
      setFavCount(favs.length);
    });
  };


  const setFav = () => {
    if (!favourite) {
      addToFavourite(media.file_id, token).then().catch();
      setFavCount(favCount + 1);
    } else {
      removeFromFavourite(media.file_id, token).then().catch();
      setFavCount(favCount - 1);
    }
    setFavourite(!favourite);
  };

  useEffect(() => {
    loadOwner();
    loadOwnerAvatar();
    loadFavourite();
    getComments(media.file_id, token).then((c) => {
      if (c.length === 0) return;
      setComment(c.reverse()[0]);
      setCommentCount(c.length);
    });
  }, []);

  let toolbar;
  if (user.user_id === media.user_id) {
    toolbar = (<ToolbarWidget showSearch={false} navigation={navigation}
      menus={[{
        icon: 'delete-empty-outline',
        title: 'Remove this post',
        action: () => {
          deleteMedia(media.file_id, token)
              .finally(() => navigation.goBack());
        },
      }, {
        icon: 'square-edit-outline',
        title: 'Edit this post',
        action: () => {
          navigation.navigate('UploadScreen', media);
        },
      }]} />);
  } else {
    toolbar = <ToolbarWidget showSearch={false} navigation={navigation} />;
  }
  return (
    <View style={{backgroundColor: Colors.greenLight, flex: 1}}>
      {toolbar}
      <ScrollView>
        <View>
          <Image source={{uri: `${baseUrl}uploads/${media.filename}`}}
            style={styles.image} />
          <View style={styles.userInfo}>
            <AvatarImage size={40} source={avatar} />
            <Text style={styles.userName}>{owner.username}</Text>
          </View>
          <View style={{flexDirection: 'row-reverse', alignContent: 'center'}}>
            <View>
              <IconButton
                icon={favourite ? 'heart' : 'heart-outline'}
                color={favourite ? Colors.greenDark : 'grey'}
                size={36}
                onPress={() => setFav()}
              />
              {favCount > 0 && <Text style={styles.favCount}>{favCount}</Text>}
            </View>
            <Text style={styles.title}>{media.title}</Text>
          </View>
          <Text style={styles.field}>
            <Text style={{fontWeight: 'bold'}}>Name: </Text>
            <Text>{media.name}</Text>
          </Text>
          <Text style={styles.field}>
            <Text style={{fontWeight: 'bold'}}>Family: </Text>
            <Text>{media.family}</Text>
          </Text>
          <Text style={{marginBottom: 16, ...styles.field}}>
            <Text style={{fontWeight: 'bold'}}>Description: </Text>
            <Text>{media.description}</Text>
          </Text>

          <View style={{
            backgroundColor: '#000000', height: 1,
            opacity: 0.4, margin: 16,
          }} />

          <Text style={{
            fontWeight: 'bold', fontSize: 18,
            ...styles.field, marginBottom: 8,
          }}>
            {`Comments . (${commentCount})`}
          </Text>
          {comment && <CommentItem
            comment={comment.comment}
            username={comment.username}
            avatar={comment.avatar}
          />}
          <TouchableWithoutFeedback onPress={() => {
            navigation.navigate('CommentScreen', media.file_id);
          }}>
            <View>
              <TextInput
                style={{marginTop: 8}}
                editable={false}
                clickable={true}
                left={<TextInput.Icon name="comment-outline" color="grey" />}
                theme={{
                  colors: {
                    label: 'grey',
                    primary: 'grey',
                  },
                }}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </View>
  );
};

PlantDetailScreen.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

const styles = StyleSheet.create({
  userInfo: {
    padding: 16,
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  userName: {
    marginStart: 8,
    alignSelf: 'center',
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    marginStart: 16,
    marginEnd: 16,
    marginTop: 16,
  },
  field: {
    marginStart: 16,
    marginEnd: 16,
    marginTop: 16,
  },
  favCount: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 8,
    backgroundColor: 'white',
    padding: 4,
    borderRadius: 15,
    aspectRatio: 1,
    width: 23,
    fontSize: 10,
    textAlign: 'center',
    borderColor: Colors.greenDark,
    borderWidth: 2,
  },
});

export default PlantDetailScreen;
