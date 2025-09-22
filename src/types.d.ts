declare namespace NodeJS {
  interface ProcessEnv {
    POSTGRES_HOST?: string;
    POSTGRES_USER?: string;
    POSTGRES_PASSWORD?: string;
    POSTGRES_DB?: string;
    POSTGRES_PORT?: string;
    REDIS_HOST?: string;
    REDIS_PORT?: string;
    KAFKA_BROKER?: string;
  }
}
