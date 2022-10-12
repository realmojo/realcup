import { axiosInstance as axios } from ".";

export const getCup = async (_id) => {
  try {
    const { data } = await axios.get(`/cup/${_id}`);
    return data;
  } catch (e) {
    throw e.response.data;
  }
};

export const getCupList = async (category, page = 1) => {
  try {
    const { data } = await axios.get(
      `/cup/list?category=${category}&page=${page}`
    );
    return data;
  } catch (e) {
    throw e.response.data;
  }
};

export const addCup = async (params) => {
  try {
    const { data } = await axios.post("/cup", params);
    return data;
  } catch (e) {
    throw e.response.data;
  }
};

export const patchCup = async (params) => {
  try {
    const { data } = await axios.patch(`/cup/${params._id}`, params);
    return data;
  } catch (e) {
    throw e.response.data;
  }
};

export const patchCupStatus = async (params) => {
  try {
    const { data } = await axios.patch(`/cup/${params._id}/status`, params);
    return data;
  } catch (e) {
    throw e.response.data;
  }
};

export const patchCupImage = async (params) => {
  try {
    const { data } = await axios.patch(`/cup/${params._id}/images`, params);
    return data;
  } catch (e) {
    throw e.response.data;
  }
};

// export const removeCup = async () => {
//   try {
//     const { data } = await axios.get("/users");
//     return data;
//   } catch (e) {
//     throw e.response.data;
//   }
// };
