CREATE TABLE IF NOT EXISTS tickets (
  id SERIAL PRIMARY KEY,
  sold BOOLEAN DEFAULT FALSE,
  sold_to VARCHAR(255)
);

-- Inserindo 9 ingressos disponíveis e 1 vendido
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
  (TRUE, 'usuario_teste'); -- ingresso já vendido