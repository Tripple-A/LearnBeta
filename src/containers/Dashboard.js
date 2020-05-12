import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Course from '../components/Course';

const Dashboard = ({ match }) => {
  const [logOut, setLogOut] = useState('false');
  const [courses, setCourses] = useState([]);
  const name = match.params.username;
  useEffect(() => {
    async function getCourses() {
      await fetch('https://mycourses-api.herokuapp.com/api/courses')
        .then(resp => resp.json())
        .then(data => {
          setCourses(data.data);
        })
        .catch(err => err);
    }
    getCourses();
  }, []);
  const handleSignOut = () => {
    localStorage.removeItem('token');
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
      <img src="https://img.icons8.com/doodle/56/000000/user-female-skin-type-5--v1.png"/>
      {' '}<br />
      {name}<br />
      <Link to="/fav">My favorites</Link><br />
      <button type="button" onClick={handleSignOut}>Sign Out</button><br />
      <div>
      <h3>Courses</h3>
      <h3>Menu Icon</h3>
      {courses.map((item, i) => <Course key={i} course={item} />)}
      </div>
    </div>
  );
};

export default Dashboard;
