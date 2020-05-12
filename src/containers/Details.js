import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  courses: state.courses,
});

const Detail = ({ courses, match }) => {
  const course = courses.filter(item => item.id === parseInt(match.params.id));
  return (
    <h5>{course[0].title}</h5>
  );
};

export default connect(mapStateToProps)(Detail);
