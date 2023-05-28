import { createConnection } from 'typeorm';

import baseConfigConnection from '@shared/infra/typeorm/baseConfigConnection';

async function createDatabaseConnection() {
  const connection = await createConnection({
    ...baseConfigConnection,
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,

    dropSchema: true
  });

  await connection.runMigrations();

  return connection;
}

export default createDatabaseConnection;
