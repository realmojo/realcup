import { axiosInstance as axios } from ".";

export const authLogin = async (params) => {
  try {
    const { data } = await axios.post(`/auth/login`, params);
    return data;
  } catch (e) {
    throw e.response.data;
  }
};
