import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import {Provider} from 'react-redux'
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'; 
import {appReducer} from './redux/reducer'
import { composeWithDevTools } from 'redux-devtools-extension';
const middleware = [
  thunk,
];
 
const store = createStore(appReducer, composeWithDevTools(
  applyMiddleware(...middleware),
  // other store enhancers if any)
  ));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}> 
      <BrowserRouter>
        <App /> 
      </BrowserRouter>
    </Provider> 
  </React.StrictMode>, 
  document.getElementById('root')
);
 