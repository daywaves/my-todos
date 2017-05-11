import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const FilterLink = ({ children, filter }) => (
  <NavLink
    exact
    to={`/${filter === 'all' ? '' : filter}`}
    activeStyle={{ textDecoration: 'none', color: '#000' }}
  >
    {children}
  </NavLink>
);

FilterLink.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  filter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
};

export default FilterLink;
