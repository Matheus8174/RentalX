import { createConnection, getConnection, getRepository } from 'typeorm';

beforeAll(async () => {
  await createConnection({
    type: 'sqlite',
    database: ':memory:',

    dropSchema: true,
    migrationsRun: true,

    entities: ['./src/modules/**/entities/*.ts'],
    migrations: ['./src/database/migrations/*.ts'],
    cli: {
      migrationsDir: './src/database/migrations'
    }
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
