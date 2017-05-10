import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setVisibilityFilter } from '../actions';
import { getCurrentVisibilityFiler } from '../reducers';

const FilterLink = ({ children, filter, setFilter, active }) => {
  if (active) {
    return <span style={{ textDecoration: 'underline' }}>{children}</span>;
  }
  return (
    <button type="button" onClick={() => setFilter(filter)}>
      {children}
    </button>
  );
};

FilterLink.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  active: getCurrentVisibilityFiler(state) === ownProps.filter,
});

export default connect(mapStateToProps, { setFilter: setVisibilityFilter })(FilterLink);
