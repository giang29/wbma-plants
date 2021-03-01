import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, Text, View, ScrollView} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {Avatar} from 'react-native-paper';
import PropTypes from 'prop-types';

const ProfileScreen = ({navigation}) => {
  const [avatar] = useState([]);
  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleBar}>
          <Ionicons name="ios-arrow-back" size={24} color="#219653"></Ionicons>
          <Ionicons name="md-more" size={24} color="#219653"></Ionicons>
        </View>

        <View style={{alignSelf: 'center'}}>
          <View style={styles.profileImage}>
            <Avatar.Image size={24} source={require('../assets/favicon.png')} />
          </View>

          <View style={styles.infoContainer}>
            <Text style={[styles.text, {fontWeight: '200', fontSize: 36}]}>
              ({userId}
            </Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statsBox}>
              <Text style={[styles.text, {fontSize: 24}]}>100</Text>
              <Text style={[styles.text, styles.subText]}>Posts</Text>
            </View>
          </View>

          <View
            style={[
              styles.statsBox,
              {borderColor: '#DFD8C8', borderLeftWidth: 1, borderRightWidth: 1},
            ]}
          >
            <Text style={[styles.text, {fontSize: 24}]}>100</Text>
            <Text style={[styles.text, styles.subText]}>Followers</Text>
          </View>

          <View style={styles.statsBox}>
            <Text style={[styles.text, {fontSize: 24}]}>100</Text>
            <Text style={[styles.text, styles.subText]}>Following</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  text: {
    fontFamily: 'HelveticaNeve',
    color: '#b1f0b7',
  },
  subText: {
    fontSize: 12,
    color: '#52570D',
    fontWeight: '500',
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginHorizontal: 16,
  },
  profileImage: {
    width: 175,
    height: 175,
    borderRadius: 100,
    overflow: 'hidden',
  },
});

ProfileScreen.propTypes = {
  navigation: PropTypes.object,
};

export default ProfileScreen;
