import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TodoLabel = styled.label`
  width: 100%;
`;

const TodoText = styled.span`
  ${props => (props.completed ? 'text-decoration: line-through; font-style: italic; color: hsla(0, 0%, 0%, 0.7);' : '')}
`;

const TodoCheckbox = styled.input`
  &[disabled] {
    &:hover {
      cursor: not-allowed;
    }
  }
`;

const TodoRemoveButton = styled.button`
  &[disabled] {
    pointer-events: none;
  }
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
    const { onChange, onRemove, text, completed, id, isPending } = this.props;
    return (
      <div className="panel-block">
        <TodoLabel htmlFor={id} className="checkbox is-unselectable" disabled={isPending}>
          <TodoCheckbox
            id={id}
            type="checkbox"
            checked={completed}
            onChange={onChange}
            disabled={isPending}
          />
          <TodoText completed={completed}>{text}</TodoText>
        </TodoLabel>
        {isPending && this.state.pendingDelayEnded
          ? <div className="loader" />
          : <TodoRemoveButton className="delete" onClick={onRemove} disabled={isPending} />}
      </div>
    );
  }
}

Todo.propTypes = {
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  isPending: PropTypes.bool.isRequired,
};

export default Todo;
