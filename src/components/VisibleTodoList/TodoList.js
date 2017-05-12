import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Todo from './Todo';

const ListWithVerticalMargins = styled.ul`
  margin: 1em 0;
`;

const TodoList = ({ todos, onTodoClick }) => (
  <ListWithVerticalMargins>
    {todos.map(todo => <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />)}
  </ListWithVerticalMargins>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  onTodoClick: PropTypes.func.isRequired,
};

export default TodoList;
