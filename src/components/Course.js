import React from 'react';

const Course = ({ course }) => (
  <div>

    <img src={course.imgUrl} />
    <h5>Title: {course.title}</h5>
    <h5>Provider: {course.provider}</h5>
    <h5>Author: {course.author}</h5>
  </div>
);

export default Course;
