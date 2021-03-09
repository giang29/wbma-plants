import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView, View,
} from 'react-native';
import PropTypes from 'prop-types';
import {Text, Image} from 'react-native-elements';
import useUploadForm from '../hooks/UploadHooks';
import * as ImagePicker from 'expo-image-picker';
import {useMedia, useTag} from '../hooks/ApiHooks';
import {appIdentifier} from '../utils/variables';
import {AuthTokenContext} from '../context/AuthTokenContext';
import ToolbarWidget from '../widgets/ToolbarWidget';
import {Colors} from '../styles/Colors';
import {Button} from 'react-native-paper';
import TextInputWithErrorMessageWidget from '../widgets/TextInpuWithErrorMessageWidget';

const UploadScreen = ({navigation}) => {
  const [image, setImage] = useState(null);
  const [filetype, setFiletype] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const {upload} = useMedia();
  const {postTag} = useTag();
  const {token} = useContext(AuthTokenContext);

  const {handleInputChange, inputs, uploadErrors} = useUploadForm();

  const doUpload = () => {
    const formData = new FormData();
    // add text to formData
    formData.append('title', inputs.title);
    formData.append('description', JSON.stringify({
      name: inputs.name,
      family: inputs.family,
      description: inputs.description,
    }));
    // add image to formData
    const filename = image.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    let type = match ? `${filetype}/${match[1]}` : filetype;
    if (type === 'image/jpg') type = 'image/jpeg';
    formData.append('file', {
      uri: image,
      name: filename,
      type: type,
    });
    setIsUploading(true);
    upload(formData, token)
        .then((r) => {
          return postTag(
              {
                file_id: r.file_id,
                tag: appIdentifier,
              },
              token,
          );
        }).finally(() => navigation.navigate('ProfileScreen'));
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {status} = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, camera roll and camera permissions needed!');
        }
      }
    })();
  }, []);

  const pickImage = async (library) => {
    let result = null;
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    };
    if (library) {
      result = await ImagePicker.launchImageLibraryAsync(options);
    } else {
      result = await ImagePicker.launchCameraAsync(options);
    }

    if (!result.cancelled) {
      setFiletype(result.type);
      setImage(result.uri);
    }
  };
  const src = image ? {uri: image} : require('../assets/ic-plant.png');

  return (
    <ScrollView style={{backgroundColor: Colors.greenLight}}>
      <KeyboardAvoidingView behavior="padding" enabled>
        <ToolbarWidget showSearch={false} navigation={navigation} />
        <View style={{padding: 16}}>
          <Text h4>Image</Text>
          <Image
            source={src}
            style={{width: '55%', height: undefined, aspectRatio: 1, marginTop: 16}}
          />
          <View style={{flexDirection: 'row', marginTop: 16}}>
            <Button
              mode="contained"
              onPress={() => pickImage(true)}
              labelStyle={{color: 'white'}}
              style={{backgroundColor: Colors.greenDark}}
            >
              Gallery
            </Button>
            <Button
              mode="contained"
              onPress={() => pickImage(false)}
              labelStyle={{color: 'white'}}
              style={{marginStart: 16, backgroundColor: Colors.greenDark}}
            >
              Camera
            </Button>
          </View>
          <Text h4 style={{marginTop: 16}}>Information</Text>
          <TextInputWithErrorMessageWidget
            theme={{
              colors: {
                label: Colors.greenDark,
                primary: Colors.greenDark,
              },
            }}
            errorMessage={uploadErrors.title}
            autoCapitalize="none"
            placeholder="Title"
            label="Title"
            mode="outlined"
            onChangeText={(txt) => handleInputChange('title', txt)}
          />
          <TextInputWithErrorMessageWidget
            theme={{
              colors: {
                label: Colors.greenDark,
                primary: Colors.greenDark,
              },
            }}
            errorMessage={uploadErrors.name}
            autoCapitalize="none"
            placeholder="Name"
            label="Name"
            mode="outlined"
            onChangeText={(txt) => handleInputChange('name', txt)}
          />
          <TextInputWithErrorMessageWidget
            theme={{
              colors: {
                label: Colors.greenDark,
                primary: Colors.greenDark,
              },
            }}
            errorMessage={uploadErrors.family}
            autoCapitalize="none"
            placeholder="Family"
            label="Family"
            mode="outlined"
            onChangeText={(txt) => handleInputChange('family', txt)}
          />
          <TextInputWithErrorMessageWidget
            theme={{
              colors: {
                label: Colors.greenDark,
                primary: Colors.greenDark,
              },
            }}
            errorMessage={uploadErrors.description}
            autoCapitalize="none"
            placeholder="Description"
            label="Description"
            mode="outlined"
            onChangeText={(txt) => handleInputChange('description', txt)}
          />
          {isUploading ? <ActivityIndicator size="large" color="#0000ff" /> : (
            <Button
              style={{backgroundColor: Colors.greenDark, marginTop: 16}}
              onPress={doUpload}
              mode="contained"
              labelStyle={{color: 'white'}}
              disabled={
                uploadErrors.title !== null ||
                uploadErrors.description !== null ||
                uploadErrors.name !== null ||
                image === null
              }>Upload</Button>
          )}
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

UploadScreen.propTypes = {
  navigation: PropTypes.object,
};

export default UploadScreen;
