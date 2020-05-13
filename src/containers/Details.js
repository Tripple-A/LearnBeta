import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

const mapStateToProps = state => ({
  courses: state.courses,
  user: state.user,
});

const Detail = ({ courses, match, user }) => {
  const [course, setCourse] = useState(null);
  const [info, setInfo] = useState('');
  const courseId = parseInt(match.params.id);
  const addFav = () => {
    console.log(user);
    console.log(courseId);
    async function Add() {
      await fetch('https://mycourses-api.herokuapp.com/api/favorites', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user,
          course_id: courseId,
        }),
      })
        .then(resp => resp.json())
        .then(data => {
          setInfo(data.data);
        })
        .catch(err => console.log(err));
    }
    Add();
  };

  useEffect(() => {
    async function wait() {
      if (courses.length === 0) {
        await fetch(`https://mycourses-api.herokuapp.com/api/courses/${courseId}`)
          .then(resp => resp.json())
          .then(data => {
            setCourse(data.data);
          }).catch(err => err);
      } else {
        setCourse(courses.filter(item => item.id === courseId)[0]);
      }
    }
    wait();
  }, []);

  if (course !== null) {
    return (
      <div>
        <h5>{info}</h5>
        <h5>{course.title}</h5>
        <img alt="course-img" src={course.imgUrl} />
        <h3>About this course:</h3>
        <p>
          {course.shortDescription.split('.')[0]}
          .
        </p>
        <button type="button">v</button>
        <div id="seeMore">
          <p>
            Provider:
            {course.provider}
          </p>
          <p>
            Author:
            {course.author}
          </p>
          <p>
            Level:
            {course.level}
          </p>
          <p>
            Medium:
            {course.medium}
          </p>
          <p>
            Language:
            {course.language}
          </p>
          <p>
            Category:
            {course.category}
          </p>
          <p>
            Broader Category:
            {course.broad_category}
          </p>
          <p>
            Ratings:
            {course.providerRatings}
          </p>
          <p>
            Duration:
            {course.duration}
          </p>
        </div>
        <button type="button" onClick={addFav}>Add to Favorites</button>
        <button type="button"><a target="_blank" rel="noopener noreferrer" href={course.url}>Take Course</a></button>
      </div>
    );
  }
  return (
    <div>loading....</div>
  );
};

export default connect(mapStateToProps)(Detail);
