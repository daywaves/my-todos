import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import logger from 'morgan';
import mongoose from 'mongoose';
import path from 'path';
import { Todo } from './db';

const app = express();
app.use(logger('combined'));
app.use(bodyParser.json());
app.use(cors());
app.use(compression());

const isProduction = process.env.NODE_ENV === 'production';

// Serve client when running in production mode
if (isProduction) {
  console.log('Serving client');
  app.use(express.static(path.join(__dirname, '../build')));
}

app.get('/api/todos', async (req, res, next) => {
  const { filter } = req.query;
  let selector;
  if (filter === 'active') {
    selector = { completed: false };
  }
  if (filter === 'completed') {
    selector = { completed: true };
  }
  try {
    const todos = await Todo.find(selector);
    return res.json(todos);
  } catch (error) {
    return next(error);
  }
});

app.post('/api/todos', async (req, res, next) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Missing text' });
  }
  try {
    const todo = await Todo.create({ text });
    return res.status(201).json(todo);
  } catch (error) {
    return next(error);
  }
});

app.get('/api/todos/:id', async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }
  try {
    const todo = await Todo.findById(id);
    return todo ? res.json(todo) : res.status(404).json({ error: 'ID not found' });
  } catch (error) {
    return next(error);
  }
});

app.put('/api/todos/:id', async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }
  try {
    const todo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
    return todo ? res.json(todo) : res.status(404).json({ error: 'ID not found' });
  } catch (error) {
    return next(error);
  }
});

app.delete('/api/todos/:id', async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ error: 'ID not found' });
    }
    await todo.remove();
    return res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
});

if (isProduction) {
  // Direct unknown paths to client and handle 404 there
  app.use('*', (req, res) => res.sendFile(path.resolve(__dirname, '../build/index.html')));
}

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  console.error(err.stack);
  return res.status(500).json({ error: 'Server error' });
});

app.listen(3001, () => {
  console.log('Server running at http://localhost:3001/');
});
