import React, {useContext} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
// eslint-disable-next-line max-len
import AvatarImage from 'react-native-paper/src/components/Avatar/AvatarImage';
import getUserAvatar from '../hooks/AvatarHook';
import PropsType from 'prop-types';
import {IconButton, Text} from 'react-native-paper';
import {UserInfoContext} from '../context/UserInfoContext';
import {Colors} from '../styles/Colors';

const MenuScreen = ({navigation}) => {
  const {user} = useContext(UserInfoContext);
  const {userImage} = getUserAvatar();
  return (
    <ScrollView style={styles.container}>
      <IconButton
        icon="arrow-left"
        size={30}
        color="black"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.userInfo}>
        <AvatarImage size={40} source={userImage} />
        <Text style={styles.userName}>{user.username}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: Colors.greenLight,
  },
  userInfo: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    paddingStart: 16,
    fontSize: 20,
  },
});

MenuScreen.propTypes = {
  navigation: PropsType.object,
};
export default MenuScreen;
