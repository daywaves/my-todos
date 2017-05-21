import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TodoText = styled.span`
  flex-grow: 1;
  ${props => (props.completed ? 'text-decoration: line-through; font-style: italic; color: hsla(0, 0%, 0%, 0.7);' : '')}
`;

const Todo = ({ onToggle, onRemove, text, completed, id, isPending, showLoader }) => {
  const inputID = `checkbox-${id}`;
  return (
    <label htmlFor={inputID} className="panel-block">
      <input
        id={inputID}
        type="checkbox"
        onChange={onToggle}
        checked={completed}
        disabled={isPending}
      />
      <TodoText completed={completed} className="is-unselectable">
        {text}
      </TodoText>
      {showLoader
        ? <div className="loader" />
        : <button
          className="button is-small is-outlined is-danger"
          onClick={onRemove}
          disabled={isPending}
        >
          <span className="icon is-small" aria-label="Delete">
            <i className="fa fa-times" aria-hidden="true" />
          </span>
        </button>}
    </label>
  );
};

Todo.propTypes = {
  onToggle: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  isPending: PropTypes.bool.isRequired,
  showLoader: PropTypes.bool,
};

Todo.defaultProps = {
  showLoader: false,
};

export default Todo;
