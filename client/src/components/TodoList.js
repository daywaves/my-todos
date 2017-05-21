import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

const TodoList = ({ todos, onTodoToggle, onTodoRemove }) => {
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
          onToggle={() => onTodoToggle(todo.id, !todo.completed)}
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
  onTodoToggle: PropTypes.func.isRequired,
  onTodoRemove: PropTypes.func.isRequired,
};

export default TodoList;
