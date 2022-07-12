import { createConnection, getConnection, getRepository } from 'typeorm';

import baseConfigConnection from '@shared/infra/typeorm/baseConfigConnection';

beforeAll(async () => {
  await createConnection({
    ...baseConfigConnection,

    type: 'better-sqlite3',
    database: ':memory:',

    dropSchema: true,
    migrationsRun: true
  });
});

afterAll(() => {
  const connection = getConnection();

  connection.close();
});

afterEach(async () => {
  const entities = getConnection().entityMetadatas;

  const entityDeletionPromises = entities.map(({ name }) =>
    getRepository(name).clear()
  );

  await Promise.all(entityDeletionPromises);
});
