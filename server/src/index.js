import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import { Todo } from './db';

const app = express();
app.use(logger('combined'));
app.use(bodyParser.json());
app.use(cors());
app.use(compression());

app.get('/api/todos', (req, res, next) => {
  const { filter } = req.query;
  let selector;
  if (filter === 'active') {
    selector = { completed: false };
  }
  if (filter === 'completed') {
    selector = { completed: true };
  }
  return Todo.find(selector).then(todos => res.json(todos), next);
});

app.post('/api/todos', (req, res, next) => {
  const { text } = req.body;
  if (text) {
    return Todo.create({ text }).then(todo => res.status(201).json(todo), next);
  }
  return res.sendStatus(400);
});

app.get('/api/todos/:id', (req, res, next) => {
  const { id } = req.params;
  return Todo.findById(id).then(todo => (todo ? res.json(todo) : res.sendStatus(404)), next);
});

app.put('/api/todos/:id', (req, res, next) => {
  const { id } = req.params;
  return Todo.findByIdAndUpdate(id, req.body, { new: true }).then(
    todo => (todo ? res.json(todo) : res.sendStatus(404)),
    next,
  );
});

app.delete('/api/todos/:id', (req, res, next) => {
  const { id } = req.params;
  return Todo.findById(id).then((todo) => {
    if (!todo) {
      res.sendStatus(404);
    } else {
      todo.remove().then(() => res.sendStatus(200), next);
    }
  }, next);
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  console.error(err.stack);
  return res.status(500).json({ error: 'Something went wrong' });
});

app.listen(3001, () => {
  console.log('Server running at http://localhost:3001/');
});
