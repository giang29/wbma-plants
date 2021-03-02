import React, {useState, useEffect, useContext} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Colors} from '../styles/Colors';
import ToolbarWidget from '../widgets/ToolbarWidget';
import PropTypes from 'prop-types';
import {addComment, getComments} from '../repository/WbmaApi';
import {AuthTokenContext} from '../context/AuthTokenContext';
import CommentItem from '../widgets/CommentItem';
import {TextInput} from 'react-native-paper';

const CommentScreen = ({navigation, route}) => {
  const fileId = route.params;
  const {token} = useContext(AuthTokenContext);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const textFieldRef = React.useRef();
  const listRef = React.useRef();

  const postComment = () => {
    if (text.length === 0) return;
    addComment(token, fileId, text)
      .then(() => getComments(fileId, token))
      .then((c) => {
        setComments(c);
        setText('');
        textFieldRef.current.clear();
      });
  };

  useEffect(() => {
    getComments(fileId, token).then((c) => {
      setComments(c);
    });
  }, []);
  return (
    <View style={styles.container}>
      <ToolbarWidget showSearch={true} navigation={navigation} />
      <FlatList
        ref={listRef}
        style={styles.list}
        data={comments}
        keyExtractor={(item) => item.commentId.toString()}
        onContentSizeChange={() => listRef.current.scrollToEnd()}
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
      <TextInput
        ref={textFieldRef}
        style={styles.textField}
        left={<TextInput.Icon name="comment-outline" color="grey" />}
        right={
          <TextInput.Icon
            name="send"
            color={Colors.greenDark}
            onPress={postComment}
          />
        }
        onChangeText={(txt) => setText(txt)}
        theme={{
          colors: {
            label: 'grey',
            primary: 'grey',
          },
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
    flexGrow: 2,
  },
  textField: {
    width: '100%',
  },
});

export default CommentScreen;
