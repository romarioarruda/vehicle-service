# Estágio de construção
FROM node:20.18 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Estágio p/ Produção
FROM node:20.18-slim AS production

WORKDIR /app

COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/src/database/local /app/dist/database/local
COPY --from=builder /app/node_modules /app/node_modules

EXPOSE 3000

CMD ["node", "dist/index.js"]
