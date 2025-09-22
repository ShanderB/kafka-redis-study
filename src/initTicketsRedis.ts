import { redis } from "./redis";
import { pool } from "./db";

export async function initTickets() {
  for (let i = 1; i <= 10; i++) {
    await redis.set(`ticket:${i}:available`, "true");
  }
}

export async function initTicketsDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tickets (
      id SERIAL PRIMARY KEY,
      sold BOOLEAN DEFAULT FALSE,
      sold_to VARCHAR(255)
    );
  `);

  await pool.query(`DELETE FROM tickets;`);
  await pool.query(`
    INSERT INTO tickets (sold, sold_to) VALUES
      (FALSE, NULL),
      (FALSE, NULL),
      (FALSE, NULL),
      (FALSE, NULL),
      (FALSE, NULL),
      (FALSE, NULL),
      (FALSE, NULL),
      (FALSE, NULL),
      (FALSE, NULL),
      (TRUE, 'usuario_teste');
  `);
}