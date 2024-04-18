// 引入axios，并创建axios实例对象
import axios from "axios";

const service = axios.create({
  // url = base url + request url
  baseURL: 'api',
  timeout: 3000
});

export default service;
