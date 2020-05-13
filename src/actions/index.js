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

const FILTER = word => ({
  type: 'PUT FILTER',
  word,
});


export {
  LOGIN, ADD, LOGOUT, FILTER,
};
