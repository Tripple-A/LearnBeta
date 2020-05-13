import React from 'react';
import { connect } from 'react-redux';
import { FILTER } from '../actions';

const mapDispatchToProps = dispatch => ({
  addFilter: word => dispatch(FILTER(word)),
});
const Filter = ({ addFilter }) => (
  <input type="text" onChange={e => addFilter(e.target.value)} />
);

export default connect(null, mapDispatchToProps)(Filter);
