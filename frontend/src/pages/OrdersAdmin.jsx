import React, { useEffect, useState, useContext } from "react";
import { getOrders, deleteOrder, updateOrder } from "../services/orderService.js";
import { getCustomers } from "../services/customers.js";
import { AuthContext } from "../context/AuthContext";


// Возможные статусы заказа
const STATUS_OPTIONS = ["Created", "Processing", "Paid", "Cancelled", "Delivered"];

export default function OrdersAdmin() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line
  }, []);

  async function loadAll() {
    setLoading(true);
    try {
      const [ordersData, customersData] = await Promise.all([
        getOrders(token),
        getCustomers(token)
      ]);
      setOrders(ordersData);
      setCustomers(customersData);
    } finally {
      setLoading(false);
    }
  }

  function getCustomerInfo(customer_id) {
    const customer = customers.find(c => c.id === customer_id);
    console.log("orders", JSON.stringify(orders, null, 2));
    console.log("customers", JSON.stringify(customers, null, 2));
    if (!customer) return { name: "—", email: "—" };
    return { name: customer.name, email: customer.email };
  }

  function calcOrderTotal(order) {
    if (!order.products) return "—";
    return order.products.reduce(
      (sum, p) => sum + (Number(p.price) || 0) * (Number(p.quantity) || 1),
      0
    );
  }

  if (loading) return <div>Загрузка...</div>;

  async function handleDelete(id) {
  if (window.confirm("Удалить этот заказ?")) {
    await deleteOrder(id, token);
    await loadAll(); // чтобы после удаления обновить таблицу
  }
}

  async function handleStatusChange(id, newStatus) {
  await updateOrder(id, { status: newStatus }, token);
  await loadAll();
}

  return (
    <div>
      <h2>Заказы</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Клиент</th>
            <th>Email</th>
            <th>Сумма</th>
            <th>Статус</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => {
            const { name, email } = getCustomerInfo(o.customer_id);
            return (
              <React.Fragment key={o.id}>
                <tr>
                  <td>{o.id}</td>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{calcOrderTotal(o)} грн</td>
                  <td>
                    <select
                      value={o.status}
                      onChange={e => handleStatusChange(o.id, e.target.value)}
                    >
                      {STATUS_OPTIONS.map(status => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button onClick={() => setExpanded(expanded === o.id ? null : o.id)}>
                      {expanded === o.id ? "Скрыть" : "Товары"}
                    </button>
                  </td>
                  <td>
                    <button style={{ color: "red" }} onClick={() => handleDelete(o.id)}>Удалить</button>
                  </td>
                </tr>
                {expanded === o.id && (
                  <tr>
                    <td colSpan={7}>
                      <table style={{ width: "100%", marginTop: 10, background: "#f8f8f8" }}>
                        <thead>
                          <tr>
                            <th>Название</th>
                            <th>Цена за шт.</th>
                            <th>Кол-во</th>
                            <th>Всего</th>
                          </tr>
                        </thead>
                        <tbody>
                          {o.products.map((p, idx) => (
                            <tr key={idx}>
                              <td>{p.name}</td>
                              <td>{p.price} грн</td>
                              <td>{p.quantity}</td>
                              <td>{p.price * p.quantity} грн</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
