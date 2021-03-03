import React from 'react';
import {IconButton, Text, TouchableRipple} from 'react-native-paper';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';

const MenuItem = ({icon, title, onClick}) => {
  return (
    <TouchableRipple onPress={onClick}>
      <View style={styles.container}>
        <IconButton icon={icon} size={30} />
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    paddingStart: 16,
    fontSize: 20,
  },
});

MenuItem.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
};

export default MenuItem;
