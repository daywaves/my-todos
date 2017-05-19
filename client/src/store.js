import { createStore, compose, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import apiActionMiddleware from './apiActionMiddleware';
import reducers from './reducers';

const configureStore = () => {
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  /* eslint-enable */
  const middlewares = [apiActionMiddleware, thunk];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }
  return createStore(reducers, composeEnhancers(applyMiddleware(...middlewares)));
};

export default configureStore;
