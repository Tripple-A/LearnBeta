import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AliceCarousel from 'react-alice-carousel';
import { Redirect, Link } from 'react-router-dom';
import Course from '../components/Course';
import { LOGOUT, ADD } from '../actions';
import Filter from './Filter';
import 'react-alice-carousel/lib/alice-carousel.css';


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
  }, [addCourses, courses.length]);

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

  let count = 0;

  const openNav = () => {
    count += 1;
    if (count % 2 === 1) {
      document.getElementById('menu').style.width = '200px';
      document.getElementById('main').style.marginLeft = '200px';
      document.getElementById('main').style.marginTop = '20px';
    } else {
      document.getElementById('menu').style.width = '0';
      document.getElementById('main').style.marginLeft = '0';
      document.getElementById('main').style.marginTop = '-5px';
    }
  };

  const handleSlideChanged = e => {
    document.querySelector('.index').textContent = Math.round(e.item);
  };

  const resp = {
    0: { items: 1.1 },
    700: { items: 2 },
    1024: { items: 3 },
  };

  return (
    <div className="dashboard">
      {renderRedirect()}
      <div id="menu" className="menu">
        <img alt="avatar" src="https://img.icons8.com/doodle/56/000000/user-female-skin-type-5--v1.png" />
        {' '}
        <br />
        <h4>
          {name}
        </h4>
        <br />
        <button type="button" onClick={openNav}>Dashboard</button>
        <br />
        <Link to={`/favs/${name}`}>My favorites</Link>
        <br />
        <div className="footer">
          <a href="https://github.com/Tripple-A/LearnBeta/blob/learn-beta/README.md">Help</a>
          <br />
          <button type="button" onClick={handleSignOut}>Sign Out</button>
        </div>
        <br />
      </div>
      <div id="main" className="main">
        <div className="header">
          <i className="fa fa-bars" aria-hidden="true" onClick={openNav} />
          <h3>Courses</h3>
          <Filter />
        </div>
        <AliceCarousel
          responsive={resp}
          autoPlayInterval={3200}
          autoPlayDirection="ltr"
          fadeOutAnimation={true}
          mouseTrackingEnabled={true}
          disableAutoPlayOnAction={true}
          dotsDisabled={true}
          playButtonEnabled={true}
          stagePadding={{ paddingLeft: 20, paddingRight: 20 }}
          onSlideChanged={handleSlideChanged}
        >
          {selectedCourses(filter).map(item => <Course key={item.id} course={item} />)}
        </AliceCarousel>
        <div className="slideIndex">
          <span className="index">1</span>
          /
          {selectedCourses(filter).length}
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.object).isRequired,
  filter: PropTypes.string.isRequired,
  addCourses: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
