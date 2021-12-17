import axios, { Method } from 'axios';

const BASE_URL = 'http://localhost:5000';

export function dataApi<T>(
  method: Method,
  path: string,
  callback: (data: T) => void,
  data = {}
): void {
  axios({
    method,
    url: `${BASE_URL}/${path}`,
    data,
  })
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}
