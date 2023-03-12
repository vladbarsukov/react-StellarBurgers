import {BASE_URL} from "./constants";
import {getCookie, setCookie} from "./auth";

export const onResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res);
};

export function request(url, options) {
  // принимает два аргумента: урл и объект опций, как и `fetch`
  return fetch(url, options)
}


export const registrationRequest = async data =>
  await request(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  },);

export const changeUserDataRequest = async data =>
  await request(`${BASE_URL}/auth/user`, {
    method: "PATCH",
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(
      data
    )
  },);

export const resetPasswordRequest = async data =>
  await request(`${BASE_URL}/password-reset/reset`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  },);

export const logoutRequest = async data =>
  await request(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    })
  },);

export const forgotPasswordRequest = async data =>
  await request(`${BASE_URL}/password-reset`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  },);

export const loginRequest = async data =>
  await request(`${BASE_URL}/auth/login`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(
      data
    )
    },);

export const getUserRequest = async () =>
  await fetchWithRefresh(`${BASE_URL}/auth/user`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    }},);

export const getIngredientsRequest = async () =>
  await request(`${BASE_URL}/ingredients`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    }},);

export const refreshAccessToken = async () => {
 return  await request(`${BASE_URL}/auth/token`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    })
  },)
   .then(onResponse)
   .then((data) => {
     console.log(data)
     let authToken;
     authToken = data.accessToken.split("Bearer ")[1];
     setCookie("accessToken", authToken, 120);
   })

}

async function fetchWithRefresh(url, options = {}) {
  let response;
  try {
    // Выполняем запрос с текущим токеном
    response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    });

    if (response.status === 403) {
      // Если получили ошибку 401, то токен истек и нужно обновить его

       await refreshAccessToken(); // функция для обновления токена
      // Обновляем токен в куках и повторяем запрос

      response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      });
    }

  } catch (error) {
    if (error.message === "Failed to fetch") {
      // Если запрос завершился с ошибкой, то проверяем наличие токена в куках
      if (!getCookie("accessToken")) {
        // Если токен отсутствует, то обновляем его и повторяем запрос
         await refreshAccessToken(); // функция для обновления токена
        // Обновляем токен в куках и повторяем запрос

        response = await fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${getCookie("accessToken")}`,
          },
        });
      }
    }
  }

  return response;
}

