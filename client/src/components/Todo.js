import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styled from 'styled-components';
import { TOGGLE_TODO_REQUEST, EDIT_TODO_REQUEST, REMOVE_TODO_REQUEST } from '../actions';

const TodoText = styled.span`
  flex-grow: 1;
  ${props => (props.completed ? 'text-decoration: line-through; font-style: italic; color: hsl(0, 0%, 48%);' : '')}
  ${props => (props.disabled ? 'color: hsl(0, 0%, 71%);' : '')}
  transition: color 0.2s;
`;

const OpacityTransitionButton = styled.button`
  transition: opacity 250ms;
`;

// Prevent todo text from moving when checkbox changes to loader
const CheckboxContainer = styled.div`
  min-width: 2em;
`;

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text,
      isEditing: false,
    };
  }
  handleEditClick() {
    this.setState({ isEditing: !this.state.isEditing });
  }
  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }
  async handleTextSubmit() {
    this.setState({ isEditing: false });
    if (this.state.text !== this.props.text) {
      await this.props.onEdit(this.state.text);
      this.setState({ text: this.props.text });
    }
  }
  render() {
    const { onToggle, onRemove, completed, id, pendingAction } = this.props;
    const { isEditing, text } = this.state;
    const isPending = pendingAction !== null;
    const editPending = pendingAction === EDIT_TODO_REQUEST;
    const togglePending = pendingAction === TOGGLE_TODO_REQUEST;
    const removePending = pendingAction === REMOVE_TODO_REQUEST;
    const inputID = `checkbox-${id}`;

    const checkbox = (
      <input
        id={inputID}
        type="checkbox"
        onChange={onToggle}
        checked={completed}
        disabled={isPending}
      />
    );

    const textEditingInput = (
      <input
        type="text"
        className="input is-warning"
        onChange={e => this.handleTextChange(e)}
        value={text}
        onBlur={e => this.handleTextSubmit(e)}
        onKeyUp={(e) => {
          if (e.key === 'Enter') this.handleTextSubmit(e);
        }}
        autoFocus
      />
    );
    const todoText = (
      <TodoText completed={completed} className="is-unselectable" disabled={isPending}>
        {text}
      </TodoText>
    );

    return (
      <label htmlFor={inputID} className="panel-block" disabled={isPending}>
        <CheckboxContainer>
          {togglePending ? <p className="icon"><i className="loader" /></p> : checkbox}
        </CheckboxContainer>
        {isEditing ? textEditingInput : todoText}
        <div className="field is-grouped">
          <p className="control">
            <OpacityTransitionButton
              className={classnames('button is-small is-warning is-outlined', {
                'is-hidden': isEditing,
                'is-loading': editPending,
              })}
              onClick={() => this.handleEditClick()}
              disabled={isPending}
            >
              <span className="icon is-small" aria-label="Edit">
                <i className="fa fa-pencil" aria-hidden="true" />
              </span>
            </OpacityTransitionButton>
          </p>
          <p className="control">
            <OpacityTransitionButton
              className={classnames('button is-small is-outlined is-danger', {
                'is-loading': removePending,
              })}
              onClick={onRemove}
              disabled={isPending}
            >
              <span className="icon is-small" aria-label="Delete">
                <i className="fa fa-times" aria-hidden="true" />
              </span>
            </OpacityTransitionButton>
          </p>
        </div>
      </label>
    );
  }
}

Todo.propTypes = {
  onToggle: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  pendingAction: PropTypes.oneOf([TOGGLE_TODO_REQUEST, EDIT_TODO_REQUEST, REMOVE_TODO_REQUEST]),
};

Todo.defaultProps = {
  pendingAction: null,
};

export default Todo;
