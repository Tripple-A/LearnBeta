import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import Course from '../components/Course';
import { LOGOUT, ADD } from '../actions';
import Filter from './Filter';

const mapStateToProps = state => ({
  courses: state.courses,
  filter: state.filter,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(LOGOUT),
  addCourses: courses => dispatch(ADD(courses)),
});

const Dashboard = ({
  match, courses, logout, addCourses, filter,
}) => {
  const [logOut, setLogOut] = useState('false');
  const name = match.params.username;

  useEffect(() => {
    async function wait() {
      if (courses.length === 0) {
        await fetch('https://mycourses-api.herokuapp.com/api/courses')
          .then(resp => resp.json())
          .then(data => {
            addCourses(data.data);
          }).catch(err => err);
      }
    }
    wait();
  }, []);

  const selectedCourses = word => {
    if (word.length > 0) {
      return courses.filter(item => item.broad_category.toLowerCase().includes(word.toLowerCase()));
    }
    return courses;
  };
  const handleSignOut = () => {
    localStorage.removeItem('token');
    logout();
    setLogOut(true);
  };
  const renderRedirect = () => {
    if (logOut === true) {
      return <Redirect to="/" />;
    }
    return null;
  };

  return (
    <div>
      {renderRedirect()}
      <img alt="avatar" src="https://img.icons8.com/doodle/56/000000/user-female-skin-type-5--v1.png" />
      {' '}
      <br />
      {name}
      <br />
      <Link to={`/favs/${name}`}>My favorites</Link>
      <br />
      <button type="button" onClick={handleSignOut}>Sign Out</button>
      <br />
      <div>
        <h3>Courses</h3>
        <h3>Menu Icon</h3>
        <Filter />
        {selectedCourses(filter).map((item, i) => <Course key={i} course={item} />)}
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
