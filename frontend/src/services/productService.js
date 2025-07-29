import { api } from "./api";

export async function getProducts(params = {}) {
  const res = await api.get("/products/", { params });
  return res.data; // res.data — это уже массив продуктов
}

export async function getProductById(id) {
  const res = await api.get(`/products/${id}`);
  return res.data;
}

export async function createProduct(product, token) {
  const res = await api.post("/products/", product, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

export async function updateProduct(id, product, token) {
  const res = await api.put(`/products/${id}`, product, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

export async function deleteProduct(id, token) {
  const res = await api.delete(`/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}
