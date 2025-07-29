import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import {createCustomer} from "../services/customers.js";
import {createOrder} from "../services/orderService.js";


export default function Checkout() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const [customer, setCustomer] = useState({ name: "", email: "", phone: "" });
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [error, setError] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // ----- Новый вариант -----
  const handleOrder = async () => {
    setError("");
    if (!customer.name || !customer.email || !customer.phone) {
      setError("Заполните все поля!");
      return;
    }
    if (cart.length === 0) {
      setError("Корзина пуста!");
      return;
    }

    try {
      // 1. Создать клиента через сервис (без токена, если не нужно)
      const res = await createCustomer(customer);
      const customer_id = res.id;

      // 2. Создать заказ через сервис
      await createOrder({
        customer_id,
        products: cart.map(item => ({
          product_id: item.id,
          quantity: item.quantity
        }))
      });

      setOrderSuccess(true);
      clearCart();
    } catch (e) {
      if (e.response && e.response.data && e.response.data.error) {
        setError(e.response.data.error);
      } else {
        setError("Ошибка при оформлении заказа!");
      }
      console.error(e);
    }
  };

  if (orderSuccess)
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Спасибо за заказ!</h2>
        <p>Наш менеджер свяжется с вами.</p>
      </div>
    );

  return (
    <div style={{ maxWidth: 800, margin: "2rem auto" }}>
      <h2>Оформление заказа</h2>
      {cart.length === 0 ? (
        <div>Ваша корзина пуста</div>
      ) : (
        <>
          <table style={{ width: "100%", marginBottom: 20 }}>
            <thead>
              <tr>
                <th>Товар</th>
                <th>Цена</th>
                <th>Кол-во</th>
                <th>Сумма</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.price} грн</td>
                  <td>{item.quantity}</td>
                  <td>{item.price * item.quantity} грн</td>
                  <td>
                    <button onClick={() => removeFromCart(item.id)}>
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <b>Итого: {total} грн</b>
          </div>
          {/* Форма для покупателя */}
          <div style={{ marginTop: 24, padding: 16, background: "#f4f4f4", borderRadius: 8 }}>
            <h3>Ваши данные</h3>
            <input
              type="text"
              placeholder="Имя"
              value={customer.name}
              onChange={e => setCustomer({ ...customer, name: e.target.value })}
              style={{ width: "100%", marginBottom: 8, padding: 8 }}
            />
            <input
              type="email"
              placeholder="Email"
              value={customer.email}
              onChange={e => setCustomer({ ...customer, email: e.target.value })}
              style={{ width: "100%", marginBottom: 8, padding: 8 }}
            />
            <input
              type="tel"
              placeholder="Телефон"
              value={customer.phone}
              onChange={e => setCustomer({ ...customer, phone: e.target.value })}
              style={{ width: "100%", marginBottom: 8, padding: 8 }}
            />
            {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
            <button
              onClick={handleOrder}
              style={{
                marginTop: 12,
                padding: "10px 18px",
                background: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: 5,
                cursor: "pointer"
              }}
            >
              Оформить заказ
            </button>
            <button
              onClick={clearCart}
              style={{
                marginLeft: 16,
                marginTop: 12,
                padding: "10px 18px",
                background: "#ddd",
                color: "#333",
                border: "none",
                borderRadius: 5,
                cursor: "pointer"
              }}
            >
              Очистить корзину
            </button>
          </div>
        </>
      )}
    </div>
  );
}
