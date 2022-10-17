import { observable } from "mobx";
import { axiosInstance as axios } from "../api";

const storeLogin = observable({
  isLogin: false,
  userId: "",
  jwt: "",
  setJWT(value) {
    this.jwt = value;
    localStorage.setItem("jwt", value);
  },
  getJWT() {
    return localStorage.getItem("jwt");
  },
  removeJWT() {
    localStorage.removeItem("jwt");
  },
  removeUserId() {
    localStorage.removeItem("userId");
  },
  initLogin() {
    const jwt = localStorage.getItem("jwt");
    const userId = localStorage.getItem("userId");
    this.isLogin = jwt !== null ? true : false;
    if (this.isLogin) {
      this.jwt = jwt;
      this.userId = userId;
    }
    axios.interceptors.request.use(
      (config) => {
        config.headers["Authorization"] = `bearer ${jwt}`;
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );
  },
  login() {
    this.isLogin = true;
  },
  logout() {
    this.isLogin = false;
  },
  setUserId(value) {
    this.userId = value;
    localStorage.setItem("userId", value);
  },
});

export { storeLogin };
