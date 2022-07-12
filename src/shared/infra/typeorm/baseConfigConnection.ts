import { ConnectionOptions } from 'typeorm';

const connection: Omit<ConnectionOptions, 'type'> = {
  entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
  migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
  cli: {
    migrationsDir: './src/shared/infra/typeorm/migrations'
  }
};

export default connection;
