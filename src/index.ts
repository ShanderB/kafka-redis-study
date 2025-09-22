import 'dotenv/config';
import express from 'express';
import { buyTicket } from './ticketController';
import { initTickets } from './initTicketsRedis';
import { startConsumer } from './startConsumer';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API de ingressos rodando!');
});

app.listen(3000, async () => {
  console.log('Servidor rodando na porta 3000');
  await initTickets();
  startConsumer();
});

app.post('/tickets/buy', buyTicket);