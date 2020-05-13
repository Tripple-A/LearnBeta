import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const mapStateToProps = state => ({
  courses: state.courses,
  user: state.user,
});

const Detail = ({ courses, match, user }) => {
  const [course, setCourse] = useState(null);
  const [info, setInfo] = useState('');
  const [style, setStyle] = useState({ display: 'none' });
  const courseId = parseInt(match.params.id);
  const history = useHistory();
  const addFav = () => {
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
        .catch(err => err);
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

  const seeMore = () => {
    const btn = document.getElementById('toggle');
    if (btn.textContent === 'v') {
      setStyle({ display: 'block' });
      btn.textContent = '^';
    } else {
      setStyle({ display: 'none' });
      btn.textContent = 'v';
    }
  };

  if (course !== null) {
    return (
      <div>
        <h5>{info}</h5>
        <div>
          <input
            type="button"
            value="<"
            onClick={() => history.goBack()}
          />
          <h5>{course.title}</h5>
        </div>
        <img alt="course-img" src={course.imgUrl} />
        <h3>About this course:</h3>
        <p>
          {course.shortDescription.split('.')[0]}
          .
        </p>
        <div id="seeMore" style={style}>
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
        <button type="button" onClick={seeMore} id="toggle">v</button>
        <div>
          <button type="button" onClick={addFav}>Add to Favorites</button>
          <button type="button"><a target="_blank" rel="noopener noreferrer" href={course.url}>Take Course</a></button>
        </div>
      </div>
    );
  }
  return (
    <div>loading....</div>
  );
};

Detail.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

export default connect(mapStateToProps)(Detail);
