import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div style={{ padding: "2rem", textAlign: "center" }}>
    <h1>CRM Demo</h1>
    <p>Добро пожаловать в CRM! Управляйте клиентами, продуктами и заказами онлайн.</p>
    <div style={{ margin: "2rem" }}>
      <Link to="/products">
        <button style={{ padding: "1rem 2rem", fontSize: "1.1rem" }}>
          Перейти в каталог товаров
        </button>
      </Link>
    </div>
    <Link to="/login">Вход для администратора</Link>
  </div>
);

export default Home;
