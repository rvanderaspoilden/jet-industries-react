import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Helmet} from "react-helmet";
import '@shoelace-style/shoelace/dist/themes/dark.css';
import {setBasePath} from '@shoelace-style/shoelace/dist/utilities/base-path';
import {BrowserRouter} from "react-router-dom";
import {UserContextProvider} from "./contexts/user.context";

setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.83/dist/');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Helmet>
            <title>JetIndustries</title>
            <html className="sl-theme-dark"/>
        </Helmet>
        <BrowserRouter>
            <UserContextProvider>
                <App/>
            </UserContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
