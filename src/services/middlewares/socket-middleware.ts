import { Dispatch, Middleware } from "redux";
import { getCookie } from "../../utils/auth";
import { refreshAccessToken } from "../../utils/api";


import {RootState} from "../types";

interface WebSocketEvent {
  type: string;
  payload: any;
}

type TWsActionsTypes = {
  wsInit: string,
  onOpen: string,
  onClose: string,
  onError: string,
  onMessage: string,
  wsUserInit: string,
  userOnOpen: string,
  userOnClose: string,
  userOnError: string,
  userOnMessage: string
};

export const socketMiddleware: any = (
    wsUrl: string,
    wsUrlUser: string,
    wsActions: TWsActionsTypes,
): Middleware<{}, RootState> => {
  let socket: any = null;
  let userSocket: any = null;

  return (store) => (next: Dispatch) => (action) => {
    const { dispatch} = store;
    const { type } = action;
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

    if (type === wsInit) {
      socket = new WebSocket(`${wsUrl}`);
    }

    if (type === wsUserInit) {
      const accessToken = getCookie("accessToken");
      if (accessToken) {
        userSocket = new WebSocket(`${wsUrlUser}?token=${accessToken}`);
      }
    }

    if (socket) {
      socket.onopen = (event: WebSocketEvent) => {
        dispatch({ type: onOpen, payload: event });
        console.log(event)
      };

      socket.onerror = (event: WebSocketEvent) => {
        dispatch({ type: onError, payload: event });
      };

      socket.onmessage = (event: any) => {
        const { data } = event;
        const parsedData = JSON.parse(data);
        const { success, ...restParsedData } = parsedData;

        dispatch({ type: onMessage, payload: restParsedData });
      };

      socket.onclose = (event: WebSocketEvent) => {
        dispatch({ type: onClose, payload: event });
      };
    }

    if (userSocket) {
      userSocket.onopen = (event: WebSocketEvent) => {
        dispatch({ type: userOnOpen, payload: event });
      };

      userSocket.onerror = (event: WebSocketEvent) => {
        dispatch({ type: userOnError, payload: event });
      };

      userSocket.onmessage = (event: any) => {
        const { data } = event;
        const parsedData = JSON.parse(data);
        if (parsedData.message === "Invalid or missing token") {
          refreshAccessToken().then(() => {
            const accessToken = getCookie("accessToken");
            if (accessToken) {
              userSocket = new WebSocket(`${wsUrlUser}?token=${accessToken}`);
            }
          });
        }
        const { success, ...restParsedData } = parsedData;
        dispatch({ type: userOnMessage, payload: restParsedData });
      };

      userSocket.onclose = (event: WebSocketEvent) => {
        dispatch({ type: userOnClose, payload: event });
      };
    }

    next(action);
  };
};


// import {getCookie} from "../../utils/auth";
// import {refreshAccessToken} from "../../utils/api";
//
// export const socketMiddleware = (wsUrl, wsUrlUser, wsActions: TApplicationActions) => {
//   return store => {
//     let socket = null;
//     let userSocket = null;
//     return next => action => {
//       const { dispatch} = store;
//       const { type} = action;
//       const {
//         wsInit,
//         onOpen,
//         onClose,
//         onError,
//         onMessage,
//         wsUserInit,
//         userOnOpen,
//         userOnClose,
//         userOnError,
//         userOnMessage,
//       } = wsActions;
//       // const { user } = getState().User;
//       if (type === wsInit) {
//         socket = new WebSocket(`${wsUrl}`);
//       }
//       if (type === wsUserInit) {
//         userSocket = new WebSocket(`${wsUrlUser}?token=${getCookie("accessToken")}`);
//       }
//
//       if (socket) {
//         socket.onopen = event => {
//           dispatch({ type: onOpen, payload: event });
//         };
//
//         socket.onerror = event => {
//           dispatch({ type: onError, payload: event });
//         };
//
//         socket.onmessage = event => {
//           const { data } = event;
//           const parsedData = JSON.parse(data);
//           const { success, ...restParsedData } = parsedData;
//
//           dispatch({ type: onMessage, payload: restParsedData });
//         };
//
//         socket.onclose = event => {
//           dispatch({ type: onClose, payload: event });
//         };
//       }
//
//       if (userSocket) {
//         userSocket.onopen = event => {
//           dispatch({ type: userOnOpen, payload: event });
//         };
//
//         userSocket.onerror = event => {
//           dispatch({ type: userOnError, payload: event });
//         };
//
//         userSocket.onmessage = event => {
//           const { data } = event;
//           const parsedData = JSON.parse(data);
//           if (parsedData.message === 'Invalid or missing token') {
//             refreshAccessToken().then(()=>{
//               userSocket = new WebSocket(`${wsUrlUser}?token=${getCookie("accessToken")}`);
//             })
//           }
//           const { success, ...restParsedData } = parsedData;
//           dispatch({ type: userOnMessage, payload: restParsedData });
//         };
//
//         userSocket.onclose = event => {
//           dispatch({ type: userOnClose, payload: event });
//         };
//       }
//
//       next(action);
//     };
//   };
// };
