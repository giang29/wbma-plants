import {useState} from 'react';
import {validator} from '../utils/validator';

const constraints = {
  title: {
    presence: {
      message: 'cannot be empty',
    },
    length: {
      minimum: 3,
      message: 'min length is 3 characters',
    },
  },
  description: {
    presence: {
      message: 'cannot be empty',
    },
    length: {
      minimum: 5,
      message: 'min length is 5 characters',
    },
  },
  name: {
    presence: {
      message: 'cannot be empty',
    },
    length: {
      minimum: 2,
      message: 'min length is 2 characters',
    },
  },
};

const useUploadForm = (callback) => {
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    name: '',
    family: '',
  });
  const [uploadErrors, setUploadErrors] = useState({
    title: null,
    name: null,
    family: null,
    description: null,
  });

  const handleInputChange = (name, text) => {
    setInputs((inputs) => {
      return {
        ...inputs,
        [name]: text,
      };
    });
    const error = validator(name, text, constraints);
    setUploadErrors((uploadErrors) => {
      return {
        ...uploadErrors,
        [name]: error,
      };
    });
  };

  return {
    handleInputChange,
    inputs,
    setInputs,
    uploadErrors,
  };
};

export default useUploadForm;
