const validation = {
  email: {
    presence: {
      message: 'cannot be blank',
    },
    email: {
      message: `'%{value}' is not a valid email address`,
    },
  },

  password: {
    presence: {
      message: 'cannot be blank',
    },
    length: {
      minimum: 5,
      message: 'must be at least 5 characters',
    },
  },

  username: {
    presence: {
      message: 'cannot be blank',
    },
    length: {
      minimum: 3,
      message: 'must be at least 5 characters',
    },
  },
};

export default validation;
