import { schema } from 'normalizr';

export const todo = new schema.Entity('todos');

export const todos = [todo];
