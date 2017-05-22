import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import NotFound from './components/NotFound';
import configureStore from './store';
import registerServiceWorker from './registerServiceWorker';
import './index.css'; // eslint-disable-line import/no-unresolved

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/:filter(active|completed)?" component={App} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
