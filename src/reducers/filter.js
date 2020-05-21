const filter = (state = '', action) => {
  switch (action.type) {
    case 'PUT FILTER':
      return action.word;
    default:
      return state;
  }
};

export default filter;
