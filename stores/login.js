import { observable } from "mobx";
import { axiosInstance as axios } from "../api";

const storeLogin = observable({
  isLogin: false,
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
  initLogin() {
    const jwt = localStorage.getItem("jwt");
    this.isLogin = jwt !== null ? true : false;
    if (this.isLogin) {
      this.jwt = jwt;
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
});

export { storeLogin };
