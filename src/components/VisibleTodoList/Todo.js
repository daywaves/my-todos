import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TodoLi = styled.li`
  text-decoration: ${props => (props.completed ? 'line-through' : 'none')};
`;

const Todo = ({ onClick, text, completed }) => (
  <TodoLi
    role="button"
    tabIndex="0"
    onClick={onClick}
    onKeyPress={(e) => {
      if (e.key === ' ' || e.key === 'Enter') onClick();
    }}
    completed={completed}
  >
    {text}
  </TodoLi>
);

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};

export default Todo;
