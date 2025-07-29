import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar__links">
        <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>Главная</NavLink>
        <NavLink to="/products" className={({ isActive }) => isActive ? "active" : ""}>Товары</NavLink>
        <NavLink to="/checkout" className={({ isActive }) => isActive ? "active" : ""}>Корзина</NavLink>
        {token && <NavLink to="/admin" className={({ isActive }) => isActive ? "active" : ""}>Админка</NavLink>}
      </div>
      <div>
        {token
          ? <button className="navbar__logout" onClick={logout}>Выйти</button>
          : <NavLink to="/login" className="navbar__login">Вход</NavLink>
        }
      </div>
    </nav>
  );
}
