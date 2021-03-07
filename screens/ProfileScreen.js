import React, {useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {AuthTokenContext} from '../context/AuthTokenContext';
import ToolbarWidget from '../widgets/ToolbarWidget';
import {Colors} from '../styles/Colors';
import ProfileHeaderWidget from '../widgets/ProfileHeaderWidget';
import {belongToPlants, getMyMedia} from '../repository/WbmaApi';
import ProfileListItem from '../widgets/ProfileListItem';

const ProfileScreen = ({navigation}) => {
  const {token} = useContext(AuthTokenContext);

  const [posts, setPosts] = useState([{}]);

  useEffect(() => {
    return navigation.addListener('focus', () => {
      getMyMedia(token)
          .then((p) => {
            console.log(p);
            return Promise.all(
                p.map((i) => {
                  return belongToPlants(i.file_id).then((belong) => {
                    console.log(`${belong} ${i}`);
                    if (belong) return i;
                    else return null;
                  });
                }),
            );
          })
          .then((posts) => {
            console.log(posts);
            const finalPosts = posts.filter((p) => p != null);
            setPosts([{}, ...finalPosts]);
          });
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ToolbarWidget showSearch={true} navigation={navigation} />
      <FlatList
        style={styles.list}
        data={posts}
        keyExtractor={(item) => {
          if (Object.keys(item).length === 0) return 'header';
          return item.file_id.toString();
        }}
        renderItem={({item}) => {
          if (Object.keys(item).length === 0) return <ProfileHeaderWidget />;
          return <ProfileListItem singleMedia={item} navigation={navigation} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.greenLight,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
});

ProfileScreen.propTypes = {
  navigation: PropTypes.object,
};

export default ProfileScreen;
