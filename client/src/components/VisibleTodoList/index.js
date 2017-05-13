import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TodoList from './TodoList';
import FetchError from '../FetchError';
import * as actions from '../../actions';
import * as selectors from '../../reducers';

class VisibleTodoList extends Component {
  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }
  fetchData() {
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter);
  }
  render() {
    const { todos, toggleTodo, isFetching, errorMessage } = this.props;
    if (isFetching && !todos.length) {
      return <p>Loading</p>;
    }
    if (errorMessage && !todos.length) {
      return <FetchError message={errorMessage} onRetry={() => this.fetchData()} />;
    }
    return <TodoList todos={todos} onTodoClick={toggleTodo} />;
  }
}

VisibleTodoList.propTypes = {
  filter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
  fetchTodos: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  toggleTodo: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string, // eslint-disable-line react/require-default-props
};

const mapStateToProps = (state, { match }) => {
  const filter = match.params.filter || 'all';
  return {
    todos: selectors.getVisibleTodos(state, filter),
    filter,
    isFetching: selectors.isFetching(state, filter),
    errorMessage: selectors.getErrorMessage(state, filter),
  };
};

export default withRouter(connect(mapStateToProps, actions)(VisibleTodoList));
