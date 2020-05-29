import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import Course from './Course';
import 'react-alice-carousel/lib/alice-carousel.css';


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

  const resp = () => {
    if (window.innerWidth < 330) {
      return {
        0: { items: 1.07 },
        700: { items: 2 },
        1024: { items: 3 },
      };
    }
    return {
      0: { items: 1.123 },
      700: { items: 2 },
      1024: { items: 3 },
    };
  };

  const handleSlideChanged = e => {
    document.querySelector('.index').textContent = +(e.item) === 0 ? 1 : Math.round(e.item);
  };


  return (
    <div>
      <div className="favWrap">
        <div className="favHead">
          <input
            className="back-btn"
            data-testid="btn"
            type="button"
            value="<"
            onClick={() => history.go(-1)}
          />
          <h4>Favorite Courses</h4>
        </div>
        {typeof courses !== 'string' ?
          <div>
            <AliceCarousel
              responsive={resp()}
              autoPlayInterval={3200}
              autoPlayDirection="ltr"
              fadeOutAnimation
              mouseTrackingEnabled
              disableAutoPlayOnAction
              dotsDisabled
              playButtonEnabled
              stagePadding={{ paddingLeft: 20, paddingRight: 20 }}
              onSlideChanged={handleSlideChanged}
            >
              {courses.map(item => <Course key={item.id} course={item} />)}
            </AliceCarousel>
            <div className="slideIndex">
              <span className="index">1</span>
              /
          {courses.length}
            </div>
          </div>
          : <p className="no-fav">You have no favorite courses.</p>
        }

      </div>
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
