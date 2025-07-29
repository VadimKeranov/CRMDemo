# Используем официальный образ Python 3.12
FROM python:3.12-slim

# Установка зависимостей системы
RUN apt-get update && apt-get install -y gcc libpq-dev

# Установка рабочего каталога
WORKDIR /app

# Копирование зависимостей и установка pip-библиотек
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копирование исходного кода
COPY . .

# Открытие порта
EXPOSE 5000

# Запуск приложения
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]
