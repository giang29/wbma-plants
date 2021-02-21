import React from 'react';
import {Avatar, Card, IconButton, Text} from 'react-native-paper';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {Colors} from '../styles/Colors';

const ListItem = ({singleMedia}) => {
  return (
    <Card style={styles.container} elevation={4}>
      <View style={styles.userInfo}>
        <Avatar.Image size={24} source={singleMedia.avatar} />
        <Text style={styles.username}>{singleMedia.username}</Text>
      </View>
      <Card.Cover
        source={{
          uri: `http://media.mw.metropolia.fi/wbma/uploads/${singleMedia.thumbnail}`,
        }}
      />
      <Card.Actions style={styles.actions}>
        <IconButton icon="heart-outline" color={Colors.greenDark} size={20} />
        <IconButton icon="comment-outline" color={Colors.greenDark} size={20} />
        <IconButton
          icon="information-outline"
          color={Colors.greenDark}
          size={20}
        />
      </Card.Actions>
    </Card>
  );
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
    title: PropTypes.string,
    description: PropTypes.string,
    thumbnail: PropTypes.string,
    filename: PropTypes.string,
    username: PropTypes.string,
    avatar: PropTypes.any,
  }),
};

export default ListItem;
