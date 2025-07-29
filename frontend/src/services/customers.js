// services/customerService.js
import {api} from "./api.js";

export async function getCustomers(token) {
  const res = await api.get("/customers/", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

export async function createCustomer(data, token) {
  const res = await api.post("/customers/", data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

export async function updateCustomer(id, data, token) {
  const res = await api.put(`/customers/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

export async function deleteCustomer(id, token) {
  const res = await api.delete(`/customers/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}
