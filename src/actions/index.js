const LOGIN = username => ({
  type: 'LOGIN USER',
  username,
});

const LOGOUT = {
  type: 'LOGOUT USER',
};

const ADD = courses => ({
  type: 'ADD COURSES',
  courses,
});


export { LOGIN, ADD, LOGOUT };
