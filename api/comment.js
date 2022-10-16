import { axiosInstance as axios } from ".";

export const addComment = async (params) => {
  try {
    const { data } = await axios.post("/comment", params);
    return data;
  } catch (e) {
    throw e.response.data;
  }
};

export const getCommentList = async (_cupId, page = 1) => {
  try {
    const { data } = await axios.get(
      `/comment/list?_cupId=${_cupId}&page=${page}`
    );
    return data;
  } catch (e) {
    throw e.response.data;
  }
};
