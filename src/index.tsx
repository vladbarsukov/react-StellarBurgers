import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import './index.css'
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import {rootReducer} from "./services/reducers";
import thunk from "redux-thunk";
import {
    WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS, WS_GET_MESSAGE,
    WS_SEND_MESSAGE
} from "./services/actions/wsActions";
import {socketMiddleware} from "./services/middlewares/socket-middleware";

const wsUrl = 'wss://norma.nomoreparties.space/orders/all';
const wsActions = {
    wsInit: WS_CONNECTION_START,
    wsSendMessage: WS_SEND_MESSAGE,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE
};

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions)));
const store = createStore(rootReducer, enhancer);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);