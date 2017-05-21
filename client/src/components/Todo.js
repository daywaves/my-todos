import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TodoText = styled.span`
  flex-grow: 1;
  ${props => (props.completed ? 'text-decoration: line-through; font-style: italic; color: hsla(0, 0%, 0%, 0.7);' : '')}
`;

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pendingDelayEnded: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.isPending !== nextProps.isPending) {
      clearTimeout(this.pendingTimeout);
      this.setState({ pendingDelayEnded: false });
      if (nextProps.isPending) {
        this.pendingTimeout = setTimeout(() => {
          this.setState({ pendingDelayEnded: true });
        }, 1000);
      }
    }
  }
  componentWillUnmount() {
    clearTimeout(this.pendingTimeout);
  }
  render() {
    const { onToggle, onRemove, text, completed, id, isPending } = this.props;
    const showLoader = isPending && this.state.pendingDelayEnded;
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
  }
}

Todo.propTypes = {
  onToggle: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  isPending: PropTypes.bool.isRequired,
};

export default Todo;
