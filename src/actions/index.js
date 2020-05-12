const LOGIN = username => ({
  type: 'LOGIN USER',
  username,
});

const ADD = courses => ({
  type: 'ADD COURSES',
  courses,
});


export { LOGIN, ADD };
