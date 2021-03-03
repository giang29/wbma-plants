import React from 'react';
import {Text} from 'react-native-paper';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import AvatarImage from 'react-native-paper/src/components/Avatar/AvatarImage';
import {Colors} from '../styles/Colors';
const CommentItem = ({username, avatar, comment}) => {
  return (
    <View style={styles.container}>
      <AvatarImage size={40} source={avatar} />
      <View style={styles.commentContainer}>
        <Text style={styles.username}>{username}</Text>
        <Text>{comment}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    marginStart: 8,
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.greenDark,
  },
  container: {
    padding: 16,
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});

CommentItem.propTypes = {
  username: PropTypes.string,
  avatar: PropTypes.any,
  comment: PropTypes.string,
};

export default CommentItem;
