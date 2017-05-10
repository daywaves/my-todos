import { connect } from 'react-redux';
import TodoList from './TodoList';
import { toggleTodo } from '../../actions';
import { getVisibleTodos } from '../../reducers';

const mapStateToProps = state => ({
  todos: getVisibleTodos(state),
});

export default connect(mapStateToProps, { onTodoClick: toggleTodo })(TodoList);
