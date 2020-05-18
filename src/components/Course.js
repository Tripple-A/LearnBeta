import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Course = ({ course }) => (
  <div className="courses" onDragStart={e => e.preventDefault()}>
  <Link to={`/detail/${course.id}`}>

      <img className="courseImg" src={course.imgUrl} alt="course template" />
      <h5>
        Title:
        {course.title}
      </h5>
      <h5 data-testid="provider">
        Provider:
        {course.provider}
      </h5>
      <h5>
        Author:
        {course.author}
      </h5>
  </Link>
    </div>
);

Course.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number.isRequired,
    imgUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    provider: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }),
  }),
};

Course.defaultProps = {
  match: null,
};

export default Course;
