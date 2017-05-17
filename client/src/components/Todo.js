import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FullWidthLabel = styled.label`
  width: 100%;
`;

const TodoText = styled.span`
  ${props => (props.completed ? 'text-decoration: line-through; font-style: italic; color: hsla(0, 0%, 0%, 0.7);' : '')}
`;

const Todo = ({ onChange, onRemove, text, completed, id }) => (
  <div className="panel-block">
    <FullWidthLabel htmlFor={id} className="checkbox">
      <input id={id} type="checkbox" checked={completed} onChange={onChange} />
      <TodoText completed={completed}>{text}</TodoText>
    </FullWidthLabel>
    <a className="delete" role="button" tabIndex="0" onClick={onRemove} />
  </div>
);

Todo.propTypes = {
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default Todo;
