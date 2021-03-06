import React, {useState, useEffect} from 'react';
import {Card, Text} from 'react-native-paper';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {getMedia} from '../repository/WbmaApi';
import {baseUrl} from '../utils/variables';

const ProfileListItem = ({singleMedia, navigation}) => {
  const [thumbnail, setThumbnail] = useState(null);

  const loadThumbnail = () => {
    getMedia(singleMedia.file_id).then((file) => {
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
      <Card style={styles.container} elevation={4}
        onPress={() => {
          navigation.navigate('PlantDetailScreen', singleMedia);
        }}>
        <Card.Cover
          source={{
            uri: `${baseUrl}uploads/${thumbnail}`,
          }}
        />
        <Text style={styles.title}>{singleMedia.title}</Text>
        <Text style={styles.description}>
          {(singleMedia.name || '') + ' . ' + (singleMedia.family || '')}
        </Text>
      </Card>
    );
  }
  return view;
};

const styles = StyleSheet.create({
  username: {
    marginStart: 8,
  },
  container: {
    marginStart: 16,
    marginEnd: 16,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  title: {
    marginStart: 16,
    fontWeight: 'bold',
    flex: 1,
    flexDirection: 'row',
  },
  description: {
    marginStart: 16,
    marginEnd: 16,
    marginBottom: 16,
  },
  actions: {
    flex: 1,
    justifyContent: 'space-around',
  },
});

ProfileListItem.propTypes = {
  singleMedia: PropTypes.shape({
    file_id: PropTypes.number,
    user_id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    filename: PropTypes.string,
    name: PropTypes.any,
    family: PropTypes.any,
  }),
  navigation: PropTypes.object,
};

export default ProfileListItem;
