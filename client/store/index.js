import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { rootReducer } from './reducers';
import history from './history';
import { connectRouter, routerMiddleware } from 'connected-react-router';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export function configureStore(initialState) {
  return createStore(
    connectRouter(history)(rootReducer),
    initialState,
    composeEnhancers(applyMiddleware(thunk, logger, routerMiddleware(history)))
  );
}
