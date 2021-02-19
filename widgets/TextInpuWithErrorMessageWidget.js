import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import {Text, TextInput} from 'react-native-paper';

const TextInputWithErrorMessageWidget = ({errorMessage, ...textProps}) => {
  let view;
  if (errorMessage) {
    view = <Text style={{color: 'red'}}>{errorMessage}</Text>;
  } else {
    view = <></>;
  }
  return (
    <View>
      <TextInput error={errorMessage !== null} {...textProps} />
      {view}
    </View>
  );
};

TextInputWithErrorMessageWidget.propTypes = {
  errorMessage: PropTypes.string,
};

export default TextInputWithErrorMessageWidget;
