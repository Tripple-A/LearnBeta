import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Course from './Course';

const Favorites = ({ match }) => {
  const [courses, setCourses] = useState([]);
  const name = match.params.username;
  const history = useHistory();
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
  }, [name]);
  return (
    <div>
      <input
        data-testid="btn"
        type="button"
        value="<"
        onClick={() => history.go(-1)}
      />
      <h4>Favorite Courses</h4>
      {typeof courses !== 'string' ? courses.map(item => <Course key={item.id} course={item} />) : 'You have no favourite courses'}
    </div>
  );
};

Favorites.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Favorites;
