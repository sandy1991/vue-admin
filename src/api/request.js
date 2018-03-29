import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import { Loading } from 'element-ui'
import { getToken,removeToken } from "@/utils/auth";

// 创建axios实例
const service = axios.create({
  //超时时间
  timeout: 1000 * 30,
  //跨域请求，允许保存cookie
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

let loadinginstace

// request拦截器
service.interceptors.request.use(config => {
  //开启loading
  loadinginstace = Loading.service({
		fullscreen: true
  });
  //添加token
  config.headers['token'] = getToken();
  return config
}, error => {
  return Promise.reject(error)
})

// response拦截器
service.interceptors.response.use(response => {
  //关闭loading
  loadinginstace.close();
  return response
}, error => {
  //关闭loading
  loadinginstace.close();
  return Promise.reject(error)
})

export default service
