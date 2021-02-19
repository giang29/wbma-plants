import {useState} from 'react';

const useLogInForm = () => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (name, text) => {
    setInputs({
      ...inputs,
      [name]: text,
    });
  };
  return {
    handleInputChange,
    inputs,
  };
};

export default useLogInForm;
