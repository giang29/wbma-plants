import React, {useContext} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
// eslint-disable-next-line max-len
import AsyncStorage from '@react-native-async-storage/async-storage';
import AvatarImage from 'react-native-paper/src/components/Avatar/AvatarImage';
import getUserAvatar from '../hooks/AvatarHook';
import PropsType from 'prop-types';
import {IconButton, Text, TouchableRipple} from 'react-native-paper';
import {UserInfoContext} from '../context/UserInfoContext';
import {Colors} from '../styles/Colors';
import MenuItem from '../widgets/MenuItem';
import {AuthTokenContext} from '../context/AuthTokenContext';

const MenuScreen = ({navigation}) => {
  const {user, setUser, setUserImage} = useContext(UserInfoContext);
  const {setToken} = useContext(AuthTokenContext);
  const {userImage} = getUserAvatar();
  const logout = () => {
    AsyncStorage.removeItem('userToken').then(() => {
      setToken(null);
    });
  };
  return (
    <ScrollView style={styles.container}>
      <IconButton
        icon="arrow-left"
        size={30}
        color="black"
        onPress={() => navigation.goBack()}
      />
      <TouchableRipple onPress={() => console.log('ak')}>
        <View style={styles.userInfo}>
          <AvatarImage size={40} source={userImage} />
          <Text style={styles.userName}>{user.username}</Text>
        </View>
      </TouchableRipple>
      <MenuItem
        icon="home"
        title="Home"
        onClick={() => navigation.navigate('FeedScreen')}
      />
      <MenuItem icon="account" title="Profile" onClick={() => {}} />
      <MenuItem icon="magnify" title="Search" onClick={() => {}} />
      <MenuItem icon="logout" title="Log out" onClick={() => logout()} />
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
