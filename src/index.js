/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import styles from './index.module.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './redux/store/configureStore';

ReactDOM.render(
  <Provider store = {store}>
    <BrowserRouter basename="/main">
        <div className={styles.Page}>
            <App />
        </div>
    </BrowserRouter>
  </Provider>,
document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
