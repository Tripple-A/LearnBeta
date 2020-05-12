import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

const mapStateToProps = state => ({
  courses: state.courses,
});

const Detail = ({ courses, match }) => {
    const addFav = () => {
        alert('course added to favorites')
    }
  useEffect(() => {
    async function wait() {
      await courses;
    }
    wait();
  }, [courses.length]);
  const course = courses.filter(item => item.id === parseInt(match.params.id));
  if (courses.length > 0) {
    return (
      <div>
        <h5>{course[0].title}</h5>
        <img src={course[0].imgUrl}/>
        <p>Provider: {course[0].provider}</p>
        <p>Author: {course[0].author}</p>
        <p>Level: {course[0].level}</p>
        <p>Medium: {course[0].medium}</p>
        <p>Language: {course[0].language}</p>
        <p>Category: {course[0].category}</p>
        <p>Broader Category: {course[0].broad_category}</p>
    <p>Short Description: {course[0].shortDescription.split('.')[0]}.</p>
    <p>Ratings: {course[0].providerRatings}</p>
    <p>Duration: {course[0].duration}</p>
    <button>Add to Favorites</button>
    <button type="button" onClick="addFav"><a href={course[0].url}>Take Course</a></button>
      </div>
    );
  }
  return (
    <div>
      <h5>hello</h5>

    </div>
  );
};

export default connect(mapStateToProps)(Detail);
