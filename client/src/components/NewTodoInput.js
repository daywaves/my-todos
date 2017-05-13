import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTodo } from '../actions';

class NewTodoInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
  }
  handleChange(e) {
    this.setState({ input: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.addTodo(this.state.input);
    this.setState({ input: '' });
  }
  render() {
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <input
          type="text"
          onChange={e => this.handleChange(e)}
          value={this.state.input}
          placeholder="New Todo"
        />
        <button type="submit">Add Todo</button>
      </form>
    );
  }
}

NewTodoInput.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default connect(null, { addTodo })(NewTodoInput);
