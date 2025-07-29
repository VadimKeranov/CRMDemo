import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { getProducts } from "../services/productService.js";

function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  // Фильтры
  const [filters, setFilters] = useState({ name: "", minPrice: "", maxPrice: "" });
  const debouncedFilters = useDebounce(filters, 400);

  useEffect(() => {
    setLoading(true);
    // ВАЖНО! Прокидывай min_price и max_price как в API
    getProducts({
      name: debouncedFilters.name,
      min_price: debouncedFilters.minPrice,
      max_price: debouncedFilters.maxPrice
    })
      .then(setProducts)
      .finally(() => setLoading(false));
  }, [debouncedFilters]);

  if (loading) return <div>Загрузка...</div>;

  return (
    <div>
      <h2>Каталог товаров</h2>
      {/* --- Фильтры --- */}
      <div className="products-filters" style={{ marginBottom: 20 }}>
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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
        {products.map(product => (
          <div key={product.id} style={{ border: "1px solid #ddd", padding: 16 }}>
            <h4>{product.name}</h4>
            <div>{product.price} грн</div>
            <button onClick={() => addToCart(product)}>В корзину</button>
          </div>
        ))}
      </div>
    </div>
  );
}
