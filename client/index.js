import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { configureStore } from './store';

const store = configureStore();
window.store = store;
render(
  <Provider store={store}>
    <App />
  </Provider>,
  window.document.getElementById('root')
);
