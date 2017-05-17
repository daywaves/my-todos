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

const Panel = styled.div`
  width: 600px;
`;

const App = () => (
  <AppContainer>
    <Panel className="panel">
      <p className="panel-heading">Todos</p>
      <NewTodoInput />
      <VisibilitySelectionTabs />
      <VisibleTodoList />
    </Panel>
  </AppContainer>
);

export default App;
