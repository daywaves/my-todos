import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({ onClick, text, completed }) => (
  <li
    role="button"
    tabIndex="0"
    onClick={onClick}
    onKeyPress={(e) => {
      if (e.key === ' ' || e.key === 'Enter') onClick();
    }}
    style={{ textDecoration: completed ? 'line-through' : 'none' }}
  >
    {text}
  </li>
);

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};

export default Todo;
