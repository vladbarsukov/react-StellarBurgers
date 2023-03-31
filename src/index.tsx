import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import App from './components/app/app';
import './index.css'
import { Provider } from 'react-redux';
import {rootReducer} from "./services/reducers";
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE,
    WS_USER_CONNECTION_CLOSED, WS_USER_CONNECTION_ERROR,
    WS_USER_CONNECTION_START,
    WS_USER_CONNECTION_SUCCESS, WS_USER_GET_MESSAGE,
} from "./services/actions/wsActions";
import {socketMiddleware} from "./services/middlewares/socket-middleware";
import {
    wsConnectionClosed,
    wsConnectionError,
    wsConnectionSuccess,
    wsGetMessage, wsUserConnectionClosed,
    wsUserConnectionSuccess, wsUserGetMessage
} from "./services/reducers/wsReducer";

const wsUrl = 'wss://norma.nomoreparties.space/orders/all';
const wsUrlUser = 'wss://norma.nomoreparties.space/orders';

// const wsActions = {
//     wsInit: WS_CONNECTION_START,
//     onOpen: WS_CONNECTION_SUCCESS,
//     onClose: WS_CONNECTION_CLOSED,
//     onError: WS_CONNECTION_ERROR,
//     onMessage: WS_GET_MESSAGE,
//     wsUserInit: WS_USER_CONNECTION_START,
//     userOnOpen: WS_USER_CONNECTION_SUCCESS,
//     userOnClose: WS_USER_CONNECTION_CLOSED,
//     userOnError: WS_USER_CONNECTION_ERROR,
//     userOnMessage: WS_USER_GET_MESSAGE
// };

const wsActions = {
    wsInit: WS_CONNECTION_START,
    onOpen: wsConnectionSuccess,
    onClose: wsConnectionClosed,
    onError: wsConnectionError,
    onMessage: wsGetMessage,
    wsUserInit: WS_USER_CONNECTION_START,
    userOnOpen: wsUserConnectionSuccess,
    userOnClose: wsUserConnectionClosed,
    userOnError: wsConnectionError,
    userOnMessage: wsUserGetMessage
};

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware(wsUrl,wsUrlUser, wsActions)),
    devTools: process.env.NODE_ENV !== 'production',
})
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);