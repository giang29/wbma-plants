import React, {useState, useEffect, useContext} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Colors} from '../styles/Colors';
import ToolbarWidget from '../widgets/ToolbarWidget';
import PropTypes from 'prop-types';
import {getComments} from '../repository/WbmaApi';
import {AuthTokenContext} from '../context/AuthTokenContext';
import CommentItem from '../widgets/CommentItem';

const CommentScreen = ({navigation, route}) => {
  const fileId = route.params;
  const {token} = useContext(AuthTokenContext);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments(fileId, token).then((c) => {
      setComments(c);
    });
  }, []);
  return (
    <View style={styles.container}>
      <ToolbarWidget showSearch={true} navigation={navigation} />
      <FlatList
        style={styles.list}
        data={comments}
        keyExtractor={(item) => item.commentId.toString()}
        renderItem={({item}) => {
          return (
            <CommentItem
              comment={item.comment}
              username={item.username}
              avatar={item.avatar}
            />
          );
        }}
      />
    </View>
  );
};

CommentScreen.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.greenLight,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  list: {
    marginTop: 8,
    width: '100%',
  },
});

export default CommentScreen;
