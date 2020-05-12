import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

const mapStateToProps = state => ({
  courses: state.courses,
});

const Detail = ({ courses, match }) => {
    console.log(courses);
    useEffect(() => {
        async function wait(){
            await courses
        }
        wait()
    }, [courses.length]);
  const course = courses.filter(item => item.id === parseInt(match.params.id));
  if (courses.length > 0) {
  return (
      <div>
    <h5>{course[0].title}</h5>
    </div>
  )}else{
  return(
      <div>
       <h5>hello</h5>
     
      </div>
  )}
};

export default connect(mapStateToProps)(Detail);
