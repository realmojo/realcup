import axios from "axios";

export const axiosInstance = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  },
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://realcup.co.kr/api/v1"
      : "http://localhost:8080", // baseUrl
});
