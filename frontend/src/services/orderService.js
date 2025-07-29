// services/orderService.js
import {api} from "./api.js";

export async function getOrders(token) {
  const res = await api.get("/orders/", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

export async function getOrderById(id, token) {
  const res = await api.get(`/orders/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

export async function createOrder(orderData, token) {
  const res = await api.post("/orders/", orderData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

export async function updateOrder(id, orderData, token) {
  const res = await api.put(`/orders/${id}`, orderData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

export async function deleteOrder(id, token) {
  const res = await api.delete(`/orders/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}
