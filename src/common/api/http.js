import axios from 'axios';
import qs from 'qs';
import { GET, POST, PUT, DELETE } from './methods';

const instance = axios.create({
  baseURL: '',
  headers: {},
  withCredentials: true
});

instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.headers.get['Content-Type'] = 'application/json';

const fetch = (options) => {
  const { method = POST, data, url, config } = options;
  switch (method.toLowerCase()) {
    case GET:
      return instance.get(`${url}${options.data ? `?${qs.stringify(options.data)}` : ''}`, config);
    case POST:
      return instance.post(url, data, config);
    case PUT:
      return instance.put(url, qs.stringify(data), config);
    case DELETE:
      return instance.delete(`${url}${options.data ? `?${qs.stringify(options.data)}` : ''}`, config);
    default:
      return instance(options);
  }
};
// http异步请求
export default async function http(options) {
  return fetch(options)
    .then((response) => {
      return response;
    }).catch((error) => {
      return error;
    });
}