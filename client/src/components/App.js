import React from 'react';
import styled from 'styled-components';
import NewTodoInput from '../containers/NewTodoInput';
import VisibleTodoList from '../containers/VisibleTodoList';
import VisibilitySelectionTabs from './VisibilitySelectionTabs';

const AppContainer = styled.div`
  margin: 1em;
  display: flex;
  justify-content: center;
`;

const App = () => (
  <AppContainer>
    <div className="panel">
      <p className="panel-heading">Todos</p>
      <NewTodoInput />
      <VisibilitySelectionTabs />
      <VisibleTodoList />
    </div>
  </AppContainer>
);

export default App;
