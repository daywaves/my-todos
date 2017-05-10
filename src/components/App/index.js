import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NewTodoInput from '../NewTodoInput';
import VisibleTodoList from '../VisibleTodoList';
import VisibilitySelectionFooter from '../VisibilitySelectionFooter';
import { hasTodos } from '../../reducers';
import './App.css';

const App = ({ hasTodosProp }) => (
  <div className="todo-container">
    <NewTodoInput />
    {hasTodosProp
      ? <div>
        <VisibleTodoList />
        <VisibilitySelectionFooter />
      </div>
      : null}
  </div>
);

App.propTypes = {
  hasTodosProp: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  hasTodosProp: hasTodos(state),
});

export default connect(mapStateToProps)(App);
