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
  const courseId = parseInt(match.params.id, 10);
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
  }, [courseId, courses]);

  const seeMore = () => {
    const btn = document.getElementById('toggle');
    console.log(btn.src);
    if (btn.src === 'https://img.icons8.com/android/24/000000/expand-arrow.png') {
      setStyle({ display: 'block' });
      btn.src = 'https://img.icons8.com/android/24/000000/collapse-arrow.png';
    } else {
      setStyle({ display: 'none' });
      btn.src = 'https://img.icons8.com/android/24/000000/expand-arrow.png';
    }
  };

  if (course !== null) {
    return (
      <div className="detail">
        <h5 className="info">{info}</h5>
        <div className="detailTop">
          <input
            className="backBtn"
            type="button"
            value="<"
            onClick={() => history.goBack()}
          />
          <h5>{course.title}</h5>
        </div>
        <img alt="course-img" className="course-img" src={course.imgUrl} />
        <div className="detailAbout">
          <h3 className="aboutTitle">About this course:</h3>
          <p className="aboutDesc">
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
          <img
            src="https://img.icons8.com/android/24/000000/expand-arrow.png"
            onClick={seeMore}
            id="toggle"
          />

        </div>
        <div className="fixedAdder">
          <button className="adder" type="button" onClick={addFav}>Add to Favorites</button>
          <button className="adder" type="button"><a target="_blank" rel="noopener noreferrer" href={course.url}>Take Course</a></button>
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
  user: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

Detail.defaultProps = {
  user: null,
};

export default connect(mapStateToProps)(Detail);
