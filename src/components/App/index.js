import React from 'react';
import NewTodoInput from '../NewTodoInput';
import VisibleTodoList from '../VisibleTodoList';
import VisibilitySelectionFooter from '../VisibilitySelectionFooter';
import './App.css';

const App = () => (
  <div className="todo-container">
    <NewTodoInput />
    <VisibleTodoList />
    <VisibilitySelectionFooter />
  </div>
);

export default App;
