import React from 'react';
import FilterLink from './FilterLink';

const VisibilitySelectionFooter = () => (
  <ul className="visibility-selection">
    {['all', 'active', 'completed'].map(filter => (
      <li key={filter}>
        <FilterLink filter={filter === 'all' ? '' : filter}>{filter}</FilterLink>
      </li>
    ))}
  </ul>
);

export default VisibilitySelectionFooter;
