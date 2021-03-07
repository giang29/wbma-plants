import React, {useState, useEffect} from 'react';
import {Card} from 'react-native-paper';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {getMedia} from '../repository/WbmaApi';
import {baseUrl} from '../utils/variables';

const GridItem = ({fileId}) => {
  const [thumbnail, setThumbnail] = useState(null);

  const loadThumbnail = () => {
    getMedia(fileId).then((file) => {
      setThumbnail(file.thumbnails.w160);
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
      <Card style={styles.container} elevation={4}>
        <Card.Cover
          source={{
            uri: `${baseUrl}/uploads/${thumbnail}`,
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
    marginStart: 16,
    marginTop: 8,
    marginBottom: 8,
  },
});

GridItem.propTypes = {
  fileId: PropTypes.number,
};

export default GridItem;
