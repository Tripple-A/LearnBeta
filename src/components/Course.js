import React from 'react';
import { Link } from 'react-router-dom';

const Course = ({ course }) => (
  <Link to={`/detail/${course.id}`}>
    <div>

      <img src={course.imgUrl} alt="couse-image" />
      <h5>
        Title:
        {course.title}
      </h5>
      <h5>
        Provider:
        {course.provider}
      </h5>
      <h5>
        Author:
        {course.author}
      </h5>
    </div>
  </Link>
);

export default Course;
