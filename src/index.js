import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {fetchProducts, signInEmailChange, signInPasswordChange, signInErrChange, userDetails, cartDetails} from './redux/reducers';
const logger = createLogger();
const rootReducer = combineReducers({fetchProducts, signInEmailChange, signInPasswordChange, signInErrChange, userDetails, cartDetails})
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger))

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
serviceWorker.unregister();
