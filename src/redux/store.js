// To use the reducer and access the state we need to set up a store. It allows our views to subscribe to state changes and dispatch actions to update the state.

import { createStore } from 'redux';
import { reducer } from './reducer.js';

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
);