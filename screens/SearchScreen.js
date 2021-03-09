import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {getPosts} from '../repository/WbmaApi';
import {Colors} from '../styles/Colors';
import ToolbarWidget from '../widgets/ToolbarWidget';
import PropTypes from 'prop-types';
import {TextInput} from 'react-native-paper';
import GridItem from '../widgets/GridItem';

const SearchScreen = ({navigation}) => {
  const [posts, setPosts] = useState([]);
  const [idle, setIdle] = useState(true);

  return (
    <View style={styles.container}>
      <ToolbarWidget showSearch={false} navigation={navigation} />
      <TextInput
        style={styles.textField}
        left={<TextInput.Icon name="magnify" color="grey" />}
        theme={{
          colors: {
            label: 'grey',
            primary: 'grey',
          },
        }}
        autoCapitalize="none"
        placeholder="Search"
        mode="outlined"
        onChangeText={(txt) => {
          const newIdle = txt.length === 0;
          if (idle !== newIdle) setIdle(newIdle);
          if (!newIdle || txt.length !== 0) {
            getPosts()
                .then((p) => p.filter((i) => i.title.includes(txt)))
                .then((p) => setPosts(p));
          }
        }}
      />
      {idle ? (
        <></>
      ) : (
        <FlatList
          style={styles.list}
          data={posts}
          numColumns={2}
          keyExtractor={(item) => item.file_id.toString()}
          renderItem={({item}) => {
            return <GridItem fileId={item.file_id} navigation={navigation} />;
          }}
        />
      )}
    </View>
  );
};

SearchScreen.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.greenLight,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  textField: {
    paddingTop: 8,
    paddingStart: 16,
    paddingEnd: 16,
    width: '100%',
  },
  list: {
    padding: 8,
    width: '100%',
  },
});

export default SearchScreen;
