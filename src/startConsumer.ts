import { kafka } from "./kafka";
import { pool } from "./db";
import { redis } from "./redis";

export async function startConsumer() {
  const consumer = kafka.consumer({ groupId: "ticket-group" });
  await consumer.connect();
  await consumer.subscribe({ topic: "ticket-buy", fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const { ticketId, userId } = JSON.parse(message.value!.toString());
      console.log(`[CONSUMER] Evento recebido do Kafka: ticketId=${ticketId}, userId=${userId}`);

      const client = await pool.connect();
      try {
        await client.query("BEGIN");
        const { rows } = await client.query(
          "SELECT * FROM tickets WHERE id = $1 FOR UPDATE",
          [ticketId]
        );
        if (!rows.length || rows[0].sold) {
          console.log(`[CONSUMER] Ingresso ${ticketId} não existe ou já vendido`);
          await client.query("ROLLBACK");
          return;
        }
        await client.query(
          "UPDATE tickets SET sold = TRUE, sold_to = $1 WHERE id = $2",
          [userId, ticketId]
        );
        await client.query("COMMIT");
        await redis.set(`ticket:${ticketId}:available`, "false");
        console.log(`[CONSUMER] Ingresso ${ticketId} vendido para ${userId}`);
      } catch (err) {
        await client.query("ROLLBACK");
        console.log(`[CONSUMER] Erro ao processar ingresso ${ticketId}:`, err);
      } finally {
        client.release();
      }
    },
  });
}