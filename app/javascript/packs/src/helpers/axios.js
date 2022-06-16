import axios from "axios";

export const api = axios.create({
  baseURL: "/api/v1/",
});

export const fireRequest = async ({ method = "get", params, payload }) => {
  try {
    const { data } = await api[method](params, { ...payload });
    return { data, success: true };
  } catch (err) {
    return { success: false };
  }
};
