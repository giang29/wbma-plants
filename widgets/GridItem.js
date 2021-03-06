import React, {useState, useEffect} from 'react';
import {Card} from 'react-native-paper';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {getMedia} from '../repository/WbmaApi';
import {baseUrl} from '../utils/variables';

const GridItem = ({fileId, navigation}) => {
  const [thumbnail, setThumbnail] = useState(null);
  const [file, setFile] = useState(null);

  const loadThumbnail = () => {
    getMedia(fileId).then((file) => {
      setThumbnail(file.thumbnails.w160);
      setFile(file);
    });
  };

  useEffect(() => {
    loadThumbnail();
  }, []);

  let view;
  if (thumbnail == null) {
    view = <></>;
  } else {
    view = (
      <Card style={styles.container} elevation={4}
        onPress={() => {
          navigation.navigate('PlantDetailScreen', file);
        }}>
        <Card.Cover
          source={{
            uri: `${baseUrl}uploads/${thumbnail}`,
          }}
        />
      </Card>
    );
  }
  return view;
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    aspectRatio: 1,
    marginStart: 8,
    marginEnd: 8,
    marginTop: 8,
    marginBottom: 8,
  },
});

GridItem.propTypes = {
  fileId: PropTypes.number,
  navigation: PropTypes.object,
};

export default GridItem;
