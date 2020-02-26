/* eslint-disable import/prefer-default-export */
/* eslint-disable no-nested-ternary */
import { createConnection } from 'typeorm';
import env from './env';

const environment = env.NODE_ENV || 'development';
const dbUrl: string | undefined =
  environment === 'production'
    ? env.PRO_URL
    : environment === 'development'
    ? env.DATABASE_URL_DEV
    : env.DATABASE_URL_TEST;

export const connection = createConnection({
  type: 'postgres',
  url: dbUrl,
  entities: ['src/entity/*.ts'],
  migrations: ['migration/*.js'],
  subscribers: ['subscriber/*.ts'],
  cli: {
    entitiesDir: 'entity',
    migrationsDir: 'migration',
    subscribersDir: 'subscriber',
  },
  synchronize: true,
  logging: true,
});
