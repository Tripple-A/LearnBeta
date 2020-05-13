import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

const mapStateToProps = state => ({
  courses: state.courses,
  user: state.user,
});

const Detail = ({ courses, match, user }) => {
  const courseId = parseInt(match.params.id);
  const addFav = () => {
    async function getFavs() {
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
          console.log(data);
        })
        .catch(err => err);
    }
    getFavs();
  };

  useEffect(() => {
    async function wait() {
      await courses;
    }
    wait();
  }, [courses.length]);
  const course = courses.filter(item => item.id === courseId);
  if (courses.length > 0) {
    return (
      <div>
        <h5>{course[0].title}</h5>
        <img alt="course-img" src={course[0].imgUrl} />
        <p>
          Provider:
          {course[0].provider}
        </p>
        <p>
          Author:
          {course[0].author}
        </p>
        <p>
          Level:
          {course[0].level}
        </p>
        <p>
          Medium:
          {course[0].medium}
        </p>
        <p>
          Language:
          {course[0].language}
        </p>
        <p>
          Category:
          {course[0].category}
        </p>
        <p>
          Broader Category:
          {course[0].broad_category}
        </p>
        <p>
          Short Description:
          {course[0].shortDescription.split('.')[0]}
          .
        </p>
        <p>
          Ratings:
          {course[0].providerRatings}
        </p>
        <p>
          Duration:
          {course[0].duration}
        </p>
        <button type="button" onClick={addFav}>Add to Favorites</button>
        <button type="button"><a target="_blank" rel="noopener noreferrer" href={course[0].url}>Take Course</a></button>
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
