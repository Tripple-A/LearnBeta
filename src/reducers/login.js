const user = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN USER':
      return action.username;
    case 'LOGOUT USER':
      return null;
    default:
      return state;
  }
};

export default user;
