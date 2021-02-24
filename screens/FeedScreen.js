import React, {useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  getAvatar,
  getMedia,
  getPosts,
  getUserInfo,
} from '../repository/WbmaApi';
import {AuthTokenContext} from '../context/AuthTokenContext';
import ListItem from '../widgets/ListItem';
import {Colors} from '../styles/Colors';
import {UserInfoContext} from '../context/UserInfoContext';
import ToolbarWidget from '../widgets/ToolbarWidget';

const FeedScreen = () => {
  const {token} = useContext(AuthTokenContext);
  const {user} = useContext(UserInfoContext);
  const [posts, setPosts] = useState([]);

  const enrichPostData = (item) => {
    let userPromise;
    if (item.user_id === user.user_id) {
      userPromise = Promise.resolve(user);
    } else {
      userPromise = getUserInfo(token, item.user_id);
    }

    return Promise.all([
      getMedia(item.file_id),
      userPromise,
      getAvatar(item.user_id),
    ]).then(([file, user, avatar]) => {
      return {
        thumbnail: file.thumbnails.w160,
        username: user.username,
        avatar: avatar,
        ...item,
      };
    });
  };

  useEffect(() => {
    getPosts(token)
      .then((items) => {
        return Promise.all(items.map((item) => enrichPostData(item)));
      })
      .then((items) => {
        setPosts(items);
      });
  }, []);
  return (
    <View style={styles.container}>
      <ToolbarWidget showSearch={true} />
      <FlatList
        style={styles.list}
        data={posts}
        keyExtractor={(item) => item.file_id.toString()}
        renderItem={({item}) => {
          return <ListItem singleMedia={item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.greenLight,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  list: {
    marginTop: 8,
    width: '100%',
  },
});

export default FeedScreen;
