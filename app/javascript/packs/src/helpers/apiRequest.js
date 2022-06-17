import { fireRequest } from "./axios";

export const postMessage = (payload) =>
  fireRequest({
    payload,
    method: "post",
    params: `/messages`,
  });
export const getMessages = (payload) =>
  fireRequest({
    params: `/messages/${payload}`,
  });
export const login = (payload) =>
  fireRequest({
    payload,
    method: "post",
    params: "/sessions",
  });
export const isLoggedin = (payload) =>
  fireRequest({
    payload,
    method: "get",
    params: "/sessions",
  });
export const logout = () =>
  fireRequest({
    method: "delete",
    params: "/sessions",
  });
export const signup = (payload) =>
  fireRequest({
    payload,
    method: "post",
    params: "/users",
  });
export const getAllUsers = () =>
  fireRequest({
    params: "/users",
  });
export const getUser = (username) =>
  fireRequest({
    params: `/users/${username}`,
  });
