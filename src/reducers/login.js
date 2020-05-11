const user = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN USER':
      return action.username;
    default:
      return state;
  }
};

export default user;
