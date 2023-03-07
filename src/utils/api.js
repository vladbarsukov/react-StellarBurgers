import {BASE_URL} from "./constants";
import {
  PARTICIPANT_FORGOT_PASS_FORM_SUBMIT,
  PARTICIPANT_FORGOT_PASS_FORM_SUBMIT_FAILED,
  PARTICIPANT_FORGOT_PASS_FORM_SUBMIT_SUCCESS,
  PARTICIPANT_LOGIN_FORM_SUBMIT,
  PARTICIPANT_LOGIN_FORM_SUBMIT_FAILED,
  PARTICIPANT_LOGIN_FORM_SUBMIT_SUCCESS,
  PARTICIPANT_REGISTER_FORM_SUBMIT,
  PARTICIPANT_REGISTER_FORM_SUBMIT_FAILED,
  PARTICIPANT_REGISTER_FORM_SUBMIT_SUCCESS,
  PARTICIPANT_RESET_PASS_FORM_SUBMIT,
  PARTICIPANT_RESET_PASS_FORM_SUBMIT_FAILED,
  PARTICIPANT_RESET_PASS_FORM_SUBMIT_SUCCESS
} from "../services/actions/form";
import {SET_USER} from "../services/actions/user";
import {setCookie} from "./auth";

export const onResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res);
};

export function request(url, options) {
  // принимает два аргумента: урл и объект опций, как и `fetch`
  return fetch(url, options)
}

export function register(data) {
  return function (dispatch) {
    dispatch({
      type: PARTICIPANT_REGISTER_FORM_SUBMIT
    });
    fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data)
    }).then(res => {
      return res.json();
    }).then(data => {
      dispatch({
        type: PARTICIPANT_REGISTER_FORM_SUBMIT_SUCCESS,
        data
      });
    }).catch(err => {
      dispatch({
        type: PARTICIPANT_REGISTER_FORM_SUBMIT_FAILED,
      });
    })
  };
}

export function resetPass(data) {
  return function (dispatch) {
    dispatch({
      type: PARTICIPANT_RESET_PASS_FORM_SUBMIT
    });
    fetch(`${BASE_URL}/password-reset/reset`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data)
    }).then(res => {
      return res.json();
    }).then(data => {
      dispatch({
        type: PARTICIPANT_RESET_PASS_FORM_SUBMIT_SUCCESS,
        data
      });
    }).catch(err => {
      dispatch({
        type: PARTICIPANT_RESET_PASS_FORM_SUBMIT_FAILED,
      });
    })
  };
}

export function forgotPassApi(data) {
  return function (dispatch) {
    dispatch({
      type: PARTICIPANT_FORGOT_PASS_FORM_SUBMIT
    });
    fetch(`${BASE_URL}/password-reset`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data)
    }).then(res => {
      return res.json();
    }).then(data => {
      dispatch({
        type: PARTICIPANT_FORGOT_PASS_FORM_SUBMIT_SUCCESS,
        data
      });
    }).catch(err => {
      dispatch({
        type: PARTICIPANT_FORGOT_PASS_FORM_SUBMIT_FAILED,
      });
    })
  };
}

export function loginRequest(data, navigate) {
  return function (dispatch) {
    dispatch({
      type: PARTICIPANT_LOGIN_FORM_SUBMIT
    });
    fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(
      data
    )
    })
      .then(res => {
      return res.json();
    })
      .then(data => {
      dispatch({
        type: PARTICIPANT_LOGIN_FORM_SUBMIT_SUCCESS,
        data
      });
      dispatch({
        type: SET_USER,
        authData: data
      });
        let authToken
        authToken = data.accessToken.split('Bearer ')[1];
        setCookie('accessToken', authToken, 1200);
        setCookie('refreshToken', data.refreshToken, 1200);
    })
      .then(()=> navigate('/'))
      .catch(err => {
      dispatch({
        type: PARTICIPANT_LOGIN_FORM_SUBMIT_FAILED,
      });
    })
  };
}

// let authToken
// data.forEach(data => {
//   if (data.indexOf('Bearer') === 0) {
//     authToken = data.split('Bearer ')[1];
//   }
// });
// if (authToken) {
//   setCookie('tokens', authToken);
// }

// export const signIn = async form => {
//   const data = await loginRequest(form)
//     .then(res => {
//       let authToken;
//       // Ищем интересующий нас заголовок
//       res.headers.forEach(header => {
//         if (header.indexOf('Bearer') === 0) {
//           // Отделяем схему авторизации от "полезной нагрузки токена",
//           // Стараемся экономить память в куках (доступно 4кб)
//           authToken = header.split('Bearer ')[1];
//         }
//       });
//       if (authToken) {
//         // Сохраняем токен в куку token
//         setCookie('token', authToken);
//       }
//       return res.json();
//     })
//     .then(data => data);

  // if (data.success) {
  //   // Сохраняем пользователя в состояние приложения и нормализуем поле id (_id => id)
  //   return function (dispatch) {
  //     dispatch({
  //       type: SET_USER,
  //       authData: data
  //     });
  //   }
  // }
// };

// export const loginRequest = async data => {
//   return await fetch(`${BASE_URL}/auth/login`, {
//     method: 'POST',
//     mode: 'cors',
//     cache: 'no-cache',
//     credentials: 'same-origin',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     redirect: 'follow',
//     referrerPolicy: 'no-referrer',
//     body: JSON.stringify(
//       data
//     //   {
//     //   "email": "me@vladbarsukov.ru",
//     //   "password": "1234"
//     // }
//     )
//   });
// };