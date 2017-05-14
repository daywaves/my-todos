import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Todo } from './db';

const app = express();
app.use(logger('combined'));
app.use(bodyParser.json());
app.use(cors());

app.get('/api/todos', (req, res, next) => {
  const { filter } = req.query;
  let selector;
  if (filter === 'active') {
    selector = { completed: false };
  }
  if (filter === 'completed') {
    selector = { completed: true };
  }
  return Todo.find(selector).then(todos => res.json(todos), err => next(err));
});

app.post('/api/todos', (req, res, next) => {
  const { text } = req.body;
  if (text) {
    return Todo.create({ text }).then(todo => res.status(201).json(todo), err => next(err));
  }
  return res.sendStatus(400);
});

app.get('/api/todos/:id', (req, res, next) => {
  const { id } = req.params;
  return Todo.findById(id).then(todo => res.json(todo), err => next(err));
});

app.put('/api/todos/:id', (req, res, next) => {
  const { id } = req.params;
  return Todo.findByIdAndUpdate(id, req.body, { new: true }).then(
    todo => res.json(todo),
    err => next(err),
  );
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
