import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TodoList from './TodoList';
import * as actions from '../../actions';
import { getVisibleTodos } from '../../reducers';

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
    const { todos, toggleTodo } = this.props;
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
};

const mapStateToProps = (state, { match }) => {
  const filter = match.params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    filter,
  };
};

export default withRouter(connect(mapStateToProps, actions)(VisibleTodoList));
