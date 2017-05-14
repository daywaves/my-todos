import React from 'react';
import styled from 'styled-components';
import NewTodoInput from '../containers/NewTodoInput';
import VisibleTodoList from '../containers/VisibleTodoList';
import VisibilitySelectionFooter from './VisibilitySelectionFooter';

const TodoAppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 1em;
  font-family: sans-serif;
`;

const App = () => (
  <TodoAppContainer>
    <NewTodoInput />
    <VisibleTodoList />
    <VisibilitySelectionFooter />
  </TodoAppContainer>
);

export default App;
