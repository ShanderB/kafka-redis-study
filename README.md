# API de Compra de Ingressos

## Stack
- Node.js + TypeScript
- PostgreSQL (transações ACID)
- Redis (locks distribuídos)
- Kafka (eventos)
- Docker Compose

## Como rodar

1. Instale Docker e Docker Compose.
2. Rode:

```bash
docker-compose up --build
```

A API estará disponível em `http://localhost:3000`.

## Endpoints

- `POST /tickets/buy` — Compra um ingresso
  - Body: `{ "ticketId": string, "userId": string }`