import React, {useState} from 'react';
import {IconButton, Menu} from 'react-native-paper';
import PropTypes from 'prop-types';
import {View, StyleSheet, Image} from 'react-native';

const ToolbarWidget = ({showSearch, navigation, menus}) => {
  let leftView;
  const [menuOpen, setMenuOpen] = useState(false);
  if (showSearch) {
    leftView = (<IconButton
      icon="magnify"
      color="black"
      size={30}
      onPress={() => navigation.navigate('SearchScreen')}
    />);
  } else if (menus) {
    leftView = (
      <Menu
        anchor={
          (<IconButton
            icon="dots-vertical"
            color="black"
            size={30}
            onPress={() => setMenuOpen(true)}
          />)
        }
        visible={menuOpen}
        onDismiss={() => setMenuOpen(false)}>
        {menus.map((menu, index) => {
          return (<Menu.Item icon={menu.icon} title={menu.title} key={index}
            onPress={() => {
              menu.action();
              setMenuOpen(false);
            }}/>);
        })}
      </Menu>
    );
  } else {
    leftView = <View style={{width: 60}} />;
  }
  return (
    <View style={styles.container}>
      <IconButton
        icon="menu"
        color="black"
        size={30}
        onPress={(e) => navigation.navigate('MenuScreen')}
      />
      <Image source={require('../assets/ic-plant.png')} style={styles.logo} />
      {leftView}
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
  menus: PropTypes.array,
};

export default ToolbarWidget;
