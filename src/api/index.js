import axios from "axios";
import { baseUrl } from "@/api/env.js";
// import router from "@/router";
import Vue from "vue";

axios.defaults.baseURL = baseUrl;

var instance = axios.create({
  baseURL: baseUrl,
  timeout: 1000,
});

axios.interceptors.request.use(
  function (config) {
    let token = localStorage.getItem("myToken");
    if (token) {
      config.headers["token"] = token;
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
  return axios.get('/product/getProductPage?pageNum='+parames.pageNum+'&pageSize='+parames.pageSize).then(res => res.data);
}
//新人红包接口
export const newRedEnvelope = () => {
  return axios.get('/coupon/getNewUserCoupon').then(res => res.data);
}
