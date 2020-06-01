import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

import App from './App';
import * as serviceWorker from './serviceWorker';

import 'antd/dist/antd.css';
import './css/styles.scss';
import './css/antdStyles.scss';

import { Spin } from 'antd';

axios.defaults.baseURL = 'https://ow-logger.herokuapp.com/api/';
axios.defaults.headers.common['Authorization'] = localStorage.token;
// axios.interceptors.request.use(request => {
//     console.log(request);
//     // Edit request config
//     return request;
// }, error => {
//     console.log(error);
//     return Promise.reject(error);
// });

// axios.interceptors.response.use(response => {
//     console.log(response);
//     return response;
// }, error => {
//     console.log(error);
//     return Promise.reject(error);
// });

const app = (
    <BrowserRouter>
        <Suspense fallback={<Spin />}>
            <App />
        </Suspense>
    </BrowserRouter>
);
ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
