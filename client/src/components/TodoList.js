import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

const TodoList = ({ todos, onTodoChange, onTodoRemove }) => {
  if (todos.length === 0) {
    return (
      <div className="panel-block">
        <p className="content">None</p>
      </div>
    );
  }
  return (
    <div>
      {todos.map(todo => (
        <Todo
          key={todo.id}
          {...todo}
          onChange={() => onTodoChange(todo)}
          onRemove={() => onTodoRemove(todo.id)}
        />
      ))}
    </div>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  onTodoChange: PropTypes.func.isRequired,
  onTodoRemove: PropTypes.func.isRequired,
};

export default TodoList;
