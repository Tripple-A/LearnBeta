import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FILTER } from '../actions';


const mapDispatchToProps = dispatch => ({
  addFilter: word => dispatch(FILTER(word)),
});
const Filter = ({ addFilter }) => (
  <div>
  <i className="fa fa-search" aria-hidden="true" />
  <input type="text" onChange={e => addFilter(e.target.value)} />
  </div>
);

Filter.propTypes = {
  addFilter: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Filter);
