import React from 'react';
import styled from 'styled-components';
import FilterLink from './FilterLink';

const VisibilitySelectionList = styled.ul`
  margin: 1em 0;
  padding: 0;
  text-align: center;
`;

const VisibilitySelectionListItem = styled.li`
  list-style-type: none;
  display: inline;
  margin: 0 1em;
`;

const VisibilitySelectionFooter = () => (
  <VisibilitySelectionList>
    {['all', 'active', 'completed'].map(filter => (
      <VisibilitySelectionListItem key={filter}>
        <FilterLink filter={filter}>{filter}</FilterLink>
      </VisibilitySelectionListItem>
    ))}
  </VisibilitySelectionList>
);

export default VisibilitySelectionFooter;
