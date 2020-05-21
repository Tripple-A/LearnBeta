const courses = (state = [], action) => {
  switch (action.type) {
    case 'ADD COURSES':
      return action.courses;
    default:
      return state;
  }
};

export default courses;
