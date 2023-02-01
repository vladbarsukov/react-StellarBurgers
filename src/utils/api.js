export const onResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res);
};

export function request(url, options) {
  // принимает два аргумента: урл и объект опций, как и `fetch`
  return fetch(url, options)
}

