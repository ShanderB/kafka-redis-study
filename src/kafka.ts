import { Kafka } from 'kafkajs';

console.log('AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', process.env.KAFKA_BROKER);

export const kafka = new Kafka({
  clientId: 'ingressos-api',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
});
