import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import uuidV4 from 'uuid/v4';

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

const makeTodo = (text, completed = false) => ({ text, completed, id: uuidV4() });

const TODOS = [makeTodo('Test this app'), makeTodo('Make api', true)];

app.get('/api/todos', (req, res) => res.json(TODOS));
app.get('/api/todos/:filter', (req, res) => {
  const { filter } = req.params;
  if (filter === 'active') {
    return res.json(TODOS.filter(t => !t.completed));
  }
  if (filter === 'completed') {
    return res.json(TODOS.filter(t => t.completed));
  }
  return res.sendStatus(400);
});

app.post('/api/todos', (req, res) => {
  const { text } = req.body;
  if (text) {
    const todo = makeTodo(text);
    TODOS.push(todo);
    return res.status(201).json(todo);
  }
  return res.sendStatus(400);
});

app.get('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const todo = TODOS.find(t => t.id === id);
  if (todo) {
    return res.json(todo);
  }
  return res.sendStatus(404);
});

app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const todo = TODOS.find(t => t.id === id);
  if (!todo) {
    return res.sendStatus(404);
  }
  const updatedTodo = req.body;
  const updatedTodoHas = Object.prototype.hasOwnProperty.bind(updatedTodo);
  if (!updatedTodoHas('id') || !updatedTodoHas('text') || !updatedTodoHas('completed')) {
    return res.sendStatus(400);
  }
  TODOS[TODOS.indexOf(todo)] = updatedTodo;
  return res.status(200).json(updatedTodo);
});

app.listen(3001, () => {
  console.log('Server running at http://localhost:3001/'); // eslint-disable-line no-console
});
