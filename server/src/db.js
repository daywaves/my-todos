import mongoose, { Schema } from 'mongoose';

mongoose.Promise = global.Promise;
const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } = process.env;
mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`);

const todoSchema = new Schema({
  text: String,
  completed: { type: Boolean, default: false },
});

todoSchema.virtual('id').get(function getID() {
  return this._id.toHexString(); // eslint-disable-line no-underscore-dangle
});
todoSchema.set('toJSON', { virtuals: true });

export const Todo = mongoose.model('Todo', todoSchema); // eslint-disable-line import/prefer-default-export
