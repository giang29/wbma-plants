import React, {useContext, useEffect, useState} from 'react';
import {Avatar} from 'react-native-paper';
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Text,
} from 'react-native';
import {UserInfoContext} from '../context/UserInfoContext';
import {getAvatar, getCover} from '../repository/WbmaApi';

const ProfileHeaderWidget = () => {
  const {user} = useContext(UserInfoContext);
  const [cover, setCover] = useState(null);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    getAvatar(user.user_id).then((a) => {
      setAvatar(a);
    });
    getCover(user.user_id).then((a) => setCover(a));
  }, []);

  let view;
  if (avatar == null || cover == null) {
    view = <></>;
  } else {
    view = (
      <View style={styles.container}>
        <ImageBackground source={cover} style={styles.backgroundImage}>
          <Avatar.Image size={80} source={avatar} style={styles.avatar} />
        </ImageBackground>
        <Text
          style={{
            fontWeight: '200',
            fontSize: 30,
            paddingTop: 28,
            alignSelf: 'center',
          }}
        >
          {user.username}
        </Text>
        <View style={styles.unimportantTextContainer}>
          <Text style={styles.unimportantTexts}>Posts</Text>
          <Text style={styles.unimportantTexts}>Followers</Text>
          <Text style={styles.unimportantTexts}>Following</Text>
          <Text style={styles.unimportantBigTexts}>100</Text>
          <Text style={styles.unimportantBigTexts}>100</Text>
          <Text style={styles.unimportantBigTexts}>100</Text>
        </View>
      </View>
    );
  }

  return view;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 8,
  },
  backgroundImage: {
    width: '100%',
    height: 130,
  },
  avatar: {
    position: 'absolute',
    bottom: -20,
    left: (Dimensions.get('window').width - 80) / 2,
  },
  unimportantTexts: {
    width: '33%',
    textAlign: 'center',
  },
  unimportantBigTexts: {
    width: '33%',
    textAlign: 'center',
    fontSize: 18,
  },
  unimportantTextContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});

export default ProfileHeaderWidget;
