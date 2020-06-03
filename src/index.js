import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

import App from './App';
import * as serviceWorker from './serviceWorker';
import Spinner from './components/Spinner/Spinner';

import 'antd/dist/antd.css';
import './css/styles.scss';
import './css/antdStyles.scss';

axios.defaults.baseURL = 'https://ow-logger.herokuapp.com/api/';
axios.defaults.headers.common['Authorization'] = localStorage.token;

const app = (
    <BrowserRouter>
        <Suspense fallback={<Spinner />}>
            <App />
        </Suspense>
    </BrowserRouter>
);
ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
