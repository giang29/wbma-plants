import {useState} from 'react';

const useSignupForm = () => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
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

export default useSignupForm;
