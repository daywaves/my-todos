import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import * as actions from '../actions';

class NewTodoInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      pending: false,
    };
  }
  componentWillUnmount() {
    clearTimeout(this.loadingTimeout);
  }
  handleChange(e) {
    this.setState({ input: e.target.value });
  }
  async handleSubmit(e) {
    e.preventDefault();
    if (!this.state.input.trim()) {
      this.setState({ input: '' });
      return;
    }
    const { addTodo } = this.props;
    this.loadingTimeout = setTimeout(() => this.setState({ pending: true }), 1000);
    await addTodo(this.state.input);
    clearTimeout(this.loadingTimeout);
    this.setState({ input: '', pending: false });
  }
  render() {
    const controlClass = classnames('control has-icons-left', { 'is-loading': this.state.pending });
    return (
      <div className="panel-block">
        <p className={controlClass}>
          <input
            className="input"
            type="text"
            onChange={e => this.handleChange(e)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') this.handleSubmit(e);
            }}
            value={this.state.input}
            placeholder="New Todo"
            autoFocus
          />
          <span className="icon is-left is-small">
            <i className="icon-plus" aria-hidden="true" />
          </span>
        </p>
      </div>
    );
  }
}

NewTodoInput.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default connect(null, actions)(NewTodoInput);
