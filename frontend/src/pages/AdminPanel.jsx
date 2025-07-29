import React, { useState } from "react";
import ProductsAdmin from "./ProductsAdmin";
import OrdersAdmin from "./OrdersAdmin";
import CustomersAdmin from "./CustomersAdmin.jsx";

export default function AdminPanel() {
  const [tab, setTab] = useState("products");

  return (
    <div className="admin-panel">
      <h2>Админ-панель</h2>
      <div className="admin-tabs">
        <button onClick={() => setTab("products")} className={tab === "products" ? "active" : ""}>Товары</button>
        <button onClick={() => setTab("orders")} className={tab === "orders" ? "active" : ""}>Заказы</button>
        <button onClick={() => setTab("users")} className={tab === "users" ? "active" : ""}>Пользователи</button>
      </div>
      <div className="admin-content">
        {tab === "products" && <ProductsAdmin />}
        {tab === "orders" && <OrdersAdmin />}
        {tab === "users" && <CustomersAdmin />}
      </div>
    </div>
  );
}
