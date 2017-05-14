import React from 'react';
import FilterLink from './FilterLink';

const VisibilitySelectionTabs = () => (
  <p className="panel-tabs">
    {['All', 'Active', 'Completed'].map(filter => (
      <FilterLink key={filter} filter={filter.toLowerCase()}>{filter}</FilterLink>
    ))}
  </p>
);

export default VisibilitySelectionTabs;
