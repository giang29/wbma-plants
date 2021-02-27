import React, {useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {getPosts} from '../repository/WbmaApi';
import {AuthTokenContext} from '../context/AuthTokenContext';
import ListItem from '../widgets/ListItem';
import {Colors} from '../styles/Colors';
import ToolbarWidget from '../widgets/ToolbarWidget';
import PropTypes from 'prop-types';

const FeedScreen = ({navigation}) => {
  const {token} = useContext(AuthTokenContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts(token).then((items) => {
      setPosts(items);
    });
  }, []);
  return (
    <View style={styles.container}>
      <ToolbarWidget showSearch={true} navigation={navigation} />
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

FeedScreen.propTypes = {
  navigation: PropTypes.object,
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
