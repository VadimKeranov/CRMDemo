import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../services/productService.js";

// 1. Добавь хук useDebounce прямо тут или импортируй
function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "" });
  const [editingId, setEditingId] = useState(null);
  const [filters, setFilters] = useState({ name: "", minPrice: "", maxPrice: "" });
  const debouncedFilters = useDebounce(filters, 400);
  const { token } = useContext(AuthContext);

  useEffect(() => { loadProducts(); }, [debouncedFilters]);

  function loadProducts() {
    getProducts({
      name: debouncedFilters.name,
      min_price: debouncedFilters.minPrice,
      max_price: debouncedFilters.maxPrice
    }).then(setProducts);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.price) return;
    const data = { name: form.name, price: Number(form.price) };
    if (editingId) {
      await updateProduct(editingId, data, token);
      setEditingId(null); setForm({ name: "", price: "" }); loadProducts();
    } else {
      await createProduct(data, token);
      setForm({ name: "", price: "" }); loadProducts();
    }
  }

  function handleEdit(p) {
    setEditingId(p.id); setForm({ name: p.name, price: p.price });
  }

  async function handleDelete(id) {
    await deleteProduct(id, token);
    loadProducts();
  }

  return (
    <div>
      <h3>Товары</h3>
      {/* ФИЛЬТРЫ */}
      <div className="products-filters">
        <input
          placeholder="Поиск по названию"
          value={filters.name}
          onChange={e => setFilters(f => ({ ...f, name: e.target.value }))}
        />
        <input
          type="number"
          placeholder="Мин. цена"
          value={filters.minPrice}
          onChange={e => setFilters(f => ({ ...f, minPrice: e.target.value }))}
        />
        <input
          type="number"
          placeholder="Макс. цена"
          value={filters.maxPrice}
          onChange={e => setFilters(f => ({ ...f, maxPrice: e.target.value }))}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <input placeholder="Название" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        <input type="number" placeholder="Цена" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
        <button type="submit">{editingId ? "Сохранить" : "Добавить"}</button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ name: "", price: "" }) }}>Отмена</button>}
      </form>
      <table>
        <thead><tr><th>ID</th><th>Название</th><th>Цена</th><th></th></tr></thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td><td>{p.name}</td><td>{p.price}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Редактировать</button>
                <button onClick={() => handleDelete(p.id)}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
