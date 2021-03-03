import React from 'react';
import {IconButton} from 'react-native-paper';
import PropTypes from 'prop-types';
import {View, StyleSheet, Image} from 'react-native';

const ToolbarWidget = ({showSearch, navigation}) => {
  return (
    <View style={styles.container}>
      <IconButton
        icon="menu"
        color="black"
        size={30}
        onPress={(e) => navigation.navigate('MenuScreen')}
      />
      <Image source={require('../assets/ic-plant.png')} style={styles.logo} />
      {showSearch ? (
        <IconButton
          icon="magnify"
          color="black"
          size={30}
          onPress={() => navigation.navigate('SearchScreen')}
        />
      ) : (
        <View style={{width: 60}} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    paddingTop: 30,
    alignItems: 'center',
    flexWrap: 'wrap',
    alignSelf: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    width: 40,
    height: 40,
  },
});

ToolbarWidget.propTypes = {
  showSearch: PropTypes.bool,
  navigation: PropTypes.any,
};

export default ToolbarWidget;
