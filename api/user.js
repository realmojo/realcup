import { axiosInstance as axios } from ".";

export const addUser = async (params) => {
  try {
    const { data } = await axios.post("/users", params);
    return data;
  } catch (e) {
    throw e.response.data;
  }
};

export const getUser = async () => {
  try {
    const { data } = await axios.get("/users");
    return data;
  } catch (e) {
    throw e.response.data;
  }
};
