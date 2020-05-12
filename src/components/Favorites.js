import React, { useState, useEffect } from 'react';
import Course from './Course';

const Favorites = ({ match }) => {
  const [courses, setCourses] = useState([]);
  const name = match.params.username;
  useEffect(() => {
    async function getCourses() {
      await fetch(`https://mycourses-api.herokuapp.com/api/favs/${name}`)
        .then(resp => resp.json())
        .then(data => {
          setCourses(data.data);
        })
        .catch(err => err);
    }
    getCourses();
  }, []);
  return (
    <div>
      <h4>Favorite Courses</h4>
      {typeof courses !== 'string' ? courses.map((item, i) => <Course key={i} course={item} />) : 'You have no favourite courses'}
    </div>
  );
};

export default Favorites;
