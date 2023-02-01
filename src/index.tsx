import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import './index.css'
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import {rootReducer} from "./services/reducers";
import thunk from "redux-thunk";


declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(rootReducer, enhancer);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);