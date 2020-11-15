import { createStore } from 'redux';
import { RootReducer } from './root';

export const STORE = createStore(
  RootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
