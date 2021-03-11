import React, {useContext, useEffect, useState} from 'react';
import {Avatar, Button, Dialog, Paragraph, Portal} from 'react-native-paper';
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Text, TouchableWithoutFeedback, Platform,
} from 'react-native';
import {UserInfoContext} from '../context/UserInfoContext';
import {getAvatar, getCover, uploadAvatar, uploadCover} from '../repository/WbmaApi';
import * as ImagePicker from 'expo-image-picker';
import {AuthTokenContext} from '../context/AuthTokenContext';

const ProfileHeaderWidget = () => {
  const {user} = useContext(UserInfoContext);
  const {token} = useContext(AuthTokenContext);
  const [cover, setCover] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [reload, setReload] = useState(0);
  const [pickAvatar, setPickAvatar] = useState(false);
  const [pickCover, setPickCover] = useState(false);

  const pickImage = async (library, avatar) => {
    let result = null;
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: avatar ? [1, 1] : [6, 3],
      quality: 0.5,
    };
    if (library) {
      result = await ImagePicker.launchImageLibraryAsync(options);
    } else {
      if (Platform.OS !== 'web') {
        const {status} = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, camera roll and camera permissions needed!');
        } else {
          result = await ImagePicker.launchCameraAsync(options);
        }
      }
    }

    if (result && !result.cancelled) {
      if (avatar) {
        uploadAvatar(result.uri, user.user_id, token, result.type)
            .then(() => setReload(reload + 1));
      } else {
        uploadCover(result.uri, user.user_id, token, result.type)
            .then(() => setReload(reload + 1));
      }
    }
  };

  useEffect(() => {
    getAvatar(user.user_id).then((a) => {
      setAvatar(a);
    });
    getCover(user.user_id).then((a) => setCover(a));
  }, [reload]);

  let view;
  if (avatar == null || cover == null) {
    view = <></>;
  } else {
    view = (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => setPickCover(true)}>
          <ImageBackground source={cover} style={styles.backgroundImage}>
            <View style={styles.avatar}>
              <TouchableWithoutFeedback
                onPress={() => setPickAvatar(true)}>
                <Avatar.Image size={80} source={avatar} />
              </TouchableWithoutFeedback>
            </View>
          </ImageBackground>
        </TouchableWithoutFeedback>
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

        <Portal>
          <Dialog visible={pickAvatar} onDismiss={() => setPickAvatar(false)}>
            <Dialog.Content>
              <Paragraph>
                Please select a source to choose your avatar
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => {
                pickImage(true, true)
                    .then(() => setPickAvatar(false));
              }}>Library</Button>
              <Button onPress={() => {
                pickImage(false, true)
                    .then(() => setPickAvatar(false));
              }}>Camera</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        <Portal>
          <Dialog visible={pickCover} onDismiss={() => setPickCover(false)}>
            <Dialog.Content>
              <Paragraph>Please select a source to choose your cover</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => {
                pickImage(true, false)
                    .then(() => setPickCover(false));
              }}>Library</Button>
              <Button onPress={() => {
                pickImage(false, false)
                    .then(() => setPickCover(false));
              }}>Camera</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
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
    height: 80,
    width: 80,
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
