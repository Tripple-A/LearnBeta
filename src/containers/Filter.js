import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FILTER } from '../actions';


const mapDispatchToProps = dispatch => ({
  addFilter: word => dispatch(FILTER(word)),
});

const mapStateToProps = state => ({
  filter: state.filter,
});

const Filter = ({ addFilter }) => {
  const unSearch = () => {
    addFilter('');
    document.getElementById('searchDiv').style.width = '0';
  };

  const search = ({ filter }) => {
    document.getElementById('searchDiv').style.width = '100%';
  };
  return (
    <div>
      <i className="fa fa-search" aria-hidden="true" onClick={search} value={filter} />
      <div className="searchDiv" id="searchDiv">
        <input className="searchBox" type="text" onChange={e => addFilter(e.target.value)} />
        <button type="button" onClick={unSearch}>x</button>
      </div>
    </div>
  );
};

Filter.propTypes = {
  addFilter: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
