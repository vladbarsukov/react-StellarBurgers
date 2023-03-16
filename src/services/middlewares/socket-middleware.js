import {getCookie} from "../../utils/auth";

export const socketMiddleware = (wsUrl, wsUrlUser, wsActions) => {
  return store => {
    let socket = null;
    let userSocket = null;
    return next => action => {
      const { dispatch} = store;
      const { type} = action;
      const {
        wsInit,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsUserInit,
        userOnOpen,
        userOnClose,
        userOnError,
        userOnMessage,
      } = wsActions;
      // const { user } = getState().User;
      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}`);
      }
      if (type === wsUserInit) {
        userSocket = new WebSocket(`${wsUrlUser}?token=${getCookie("accessToken")}`);
      }

      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };
      }

      if (userSocket) {
        userSocket.onopen = event => {
          dispatch({ type: userOnOpen, payload: event });
        };

        userSocket.onerror = event => {
          dispatch({ type: userOnError, payload: event });
        };

        userSocket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: userOnMessage, payload: restParsedData });
        };

        userSocket.onclose = event => {
          dispatch({ type: userOnClose, payload: event });
        };
      }

      next(action);
    };
  };
};

// export const userSocketMiddleware = (wsUrl, wsActions) => {
//   return store => {
//     let userSocket = null;
//
//     return next => action => {
//       const { dispatch, getState } = store;
//       const { type, payload } = action;
//       const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
//       const { user } = getState().User;
//       if (type === wsInit && user) {
//         userSocket = new WebSocket(`${wsUrl}?token=${getCookie("accessToken")}`);
//       }
//
//       if (userSocket) {
//         userSocket.onopen = event => {
//           dispatch({ type: onOpen, payload: event });
//         };
//
//         userSocket.onerror = event => {
//           dispatch({ type: onError, payload: event });
//         };
//
//         userSocket.onmessage = event => {
//           const { data } = event;
//           const parsedData = JSON.parse(data);
//           const { success, ...restParsedData } = parsedData;
//
//           dispatch({ type: onMessage, payload: restParsedData });
//         };
//
//         userSocket.onclose = event => {
//           dispatch({ type: onClose, payload: event });
//         };
//       }
//
//       next(action);
//     };
//   };
// };