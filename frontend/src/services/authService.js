import { api } from "./api";

export async function loginUser(username, password) {
  const res = await api.post("/auth/login/", { username, password });
  return res.data.access_token;
}

export async function registerUser(username, password) {
  const res = await api.post("/auth/register/", {username, password})
  return res.data;
}