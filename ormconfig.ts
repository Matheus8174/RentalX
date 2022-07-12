import '@config/env';

import { ConnectionOptions } from 'typeorm';

import baseConfigConnection from '@shared/infra/typeorm/baseConfigConnection';

const connectionOptions: ConnectionOptions = {
  ...baseConfigConnection,

  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB
};

export default connectionOptions;
