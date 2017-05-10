import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TodoList from './TodoList';
import { toggleTodo } from '../../actions';
import { getVisibleTodos } from '../../reducers';

const mapStateToProps = (state, ownProps) => ({
  todos: getVisibleTodos(state, ownProps.match.params.filter || 'all'),
});

export default withRouter(connect(mapStateToProps, { onTodoClick: toggleTodo })(TodoList));
