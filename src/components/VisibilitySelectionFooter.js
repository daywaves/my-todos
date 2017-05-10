import React from 'react';
import FilterLink from './FilterLink';
import { FILTER_STATES } from '../reducers';

const VisibilitySelectionFooter = () => (
  <ul className="visibility-selection">
    {FILTER_STATES.map(({ filter, label }) => (
      <li key={filter}>
        <FilterLink filter={filter}>{label}</FilterLink>
      </li>
    ))}
  </ul>
);

export default VisibilitySelectionFooter;
