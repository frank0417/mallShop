import axios from "axios";
import { baseUrl } from "@/api/env.js";
axios.defaults.baseURL = baseUrl;

var instance = axios.create({
  baseURL: baseUrl,
  timeout: 1000,
});

instance.interceptors.request.use(function (config) {
  // let token = localStorage.getItem('token')
  let token ="123456"
  if (token) {
    config.headers['token'] = token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// 轮播广告接口
export const swiper = () => {
  return axios.get("/ad/getAd").then(res => res.data);
}
// 红包
export const redPacket = () => {
  return axios.get("/coupon/getCoupon").then(res => res.data);
}
// 消息
export const message = (params) => {
  return axios.get('message/getMessagePage?pageNum='+params.pageNum+'&pageSize='+params.pageSize).then(res => res.data);
}
//top
export const getTop = () => {
  return axios.get('/product/getTop').then(res => res.data);
}
//抢购商品
export const productPage = (parames) => {
  return axios.get('/product/getProductPage?pageNumber='+parames).then(res => res.data);
}

