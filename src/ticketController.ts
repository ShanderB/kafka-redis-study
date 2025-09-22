import { Request, Response } from "express";
import { redis } from "./redis";
import { kafka } from "./kafka";

export async function buyTicket(req: Request, res: Response) {
  const { ticketId, userId } = req.body;
  const redisKey = `ticket:${ticketId}:available`;
  const available = await redis.get(redisKey);

  console.log(`[API] Pedido de compra recebido: ticketId=${ticketId}, userId=${userId}`);
  console.log(`[API] Disponibilidade no Redis: ${available}`);

  if (available !== "true") {
    console.log(`[API] Ingresso ${ticketId} não disponível`);
    return res.status(400).json({ error: "Ingresso não disponível." });
  }

  const producer = kafka.producer();
  await producer.connect();
  await producer.send({
    topic: "ticket-buy",
    messages: [{ value: JSON.stringify({ ticketId, userId }) }],
  });
  await producer.disconnect();

  console.log(`[API] Pedido enviado ao Kafka: ticketId=${ticketId}, userId=${userId}`);

  res.json({ success: true, message: "Pedido recebido. Aguarde confirmação." });
}