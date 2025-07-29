FROM node:20

WORKDIR /app

# Сначала только package.json и lock-файл (без node_modules!)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --legacy-peer-deps && npm rebuild

# Копируем всё остальное (кроме node_modules — он в .dockerignore)
COPY . .

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
