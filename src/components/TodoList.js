import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

const TodoList = ({ todos, onTodoToggle, onTodoEdit, onTodoRemove }) => {
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
          id={todo.id}
          text={todo.text}
          completed={todo.completed}
          pendingAction={todo.pendingAction}
          onToggle={() => onTodoToggle(todo.id, !todo.completed)}
          onEdit={text => onTodoEdit(todo.id, text)}
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
  onTodoEdit: PropTypes.func.isRequired,
  onTodoRemove: PropTypes.func.isRequired,
};

export default TodoList;
