import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {loginUser} from "../services/authService.js"; // путь поправь, если отличается

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const token = await loginUser(username, password); // используем сервис
      login(token); // сохраняем токен в AuthContext + localStorage
      alert('Вход выполнен!');
      window.location.href = '/products'; // редирект на каталог
    } catch (err) {
      console.error(err);
      setError('Ошибка входа: неверные данные');
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: 350, margin: "3rem auto" }}>
      <h2>Вход для администратора</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Логин"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ width: "100%", marginBottom: 12, padding: 8 }}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: 12, padding: 8 }}
        />
        <button type="submit" style={{ width: "100%", padding: 10 }}>
          Войти
        </button>
        {error && <div style={{ color: "red", marginTop: 12 }}>{error}</div>}
      </form>
    </div>
  );
};

export default Login;