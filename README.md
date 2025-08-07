
# CRMdemo

Fullstack CRM для портфолио: **Flask (Python, backend) + React (Vite, frontend) + PostgreSQL + Docker**

---

## 🚀 Стек технологий

- **Backend:** Python 3.12, Flask, Flask-SQLAlchemy, Flask-Migrate, Flask-Bcrypt, Flask-CORS
- **Frontend:** React (Vite), JavaScript/TypeScript, Tailwind CSS
- **Database:** PostgreSQL
- **Dev tools:** Docker, Git, VSCode / PyCharm

---

## ⚡ Быстрый старт (локально)

### 1. Клонируй репозиторий

```bash
git clone https://github.com/VadimKeranov/CRMdemo.git
cd CRMdemo


---

### 2. Настрой и запусти backend

```bash
cd backend
py -m venv .venv           # создать виртуальное окружение (или python -m venv .venv)
.venv\Scripts\activate     # активировать venv (Windows)
# source .venv/bin/activate   # для Linux/Mac

pip install -r requirements.txt

# Настрой переменные окружения для подключения к БД (например, через .env)
# Проведи миграции (если нужно):
flask db upgrade

python run.py
```

Backend доступен по адресу: [http://localhost:5000](http://localhost:5000)

---

### 3. Настрой и запусти frontend

```bash
cd ../frontend
npm install
npm run dev
```

Frontend доступен по адресу: [http://localhost:5173](http://localhost:5173)

---

### 4. Настрой PostgreSQL (если локально)

* Локально или через Docker:

  ```bash
  docker run --name crm-postgres -e POSTGRES_PASSWORD=crm123 -p 5432:5432 -d postgres:15
  ```
* В backend настрой строку подключения к БД в `.env` или напрямую в конфиге.

---

## 🐳 Быстрый старт с Docker (отдельно для backend и frontend)

Если у тебя отдельные `docker-compose.yml` в папках **backend** и **frontend**, то запускать контейнеры нужно **по отдельности из соответствующих папок**.

---

### 1. Запусти backend (из папки backend):

```bash
cd backend
docker-compose up --build
```

* Flask backend будет доступен на [http://localhost:5000](http://localhost:5000)
* База данных PostgreSQL — на порту 5432

---

### 2. Запусти frontend (из папки frontend):

```bash
cd ../frontend
docker-compose up --build
```

* Frontend будет доступен на [http://localhost:5173](http://localhost:5173)

---

### 3. Остановить сервисы:

В каждой папке, где запущен docker-compose:

```bash
docker-compose down
```

---

## 🗂️ Основные команды

* **Frontend:**

  * `npm run dev` — запуск dev-сервера
  * `npm run build` — сборка production
* **Backend:**

  * `python run.py` — запуск Flask
* **Docker:**

  * `docker-compose up --build` — запуск контейнеров (в своей папке)
  * `docker-compose down` — остановить

---

## 📝 Автор

**Vadim Keranov**
[github.com/VadimKeranov](https://github.com/VadimKeranov)

---

## 📜 Лицензия

Проект распространяется под лицензией MIT.

---
