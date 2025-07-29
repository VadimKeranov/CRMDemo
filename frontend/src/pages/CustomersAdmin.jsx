import React, {useContext, useEffect, useState} from "react";
import {deleteCustomer, getCustomers} from "../services/customers.js";
import {AuthContext} from "../context/AuthContext.jsx";


export default function CustomersAdmin() {
  const [users, setUsers] = useState([]);
  const { token } = useContext(AuthContext);
  useEffect(() => { loadUsers(); }, []);
  function loadUsers() {
   getCustomers().then(setUsers)
  }
 async function handleDelete(id) {
    await deleteCustomer(id, token);
    loadUsers()
  }
  return (
    <div>
      <h3>Пользователи</h3>
      <table>
        <thead><tr><th>ID</th><th>Имя</th><th>Роль</th><th>Телефон</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td><button onClick={() => handleDelete(u.id)}>Удалить</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
