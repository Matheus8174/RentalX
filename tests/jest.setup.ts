import supertest from 'supertest';
import { EntityMetadata, getConnection } from 'typeorm';

import app from '@shared/infra/http/app';

import createDatabaseConnection from './helpers/createDatabaseConnection';
import createUserAdmin from './helpers/createUserAdmin';
import createSession from './helpers/createSession';

type SessionResponse = {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refreshToken: string;
};

declare global {
  // eslint-disable-next-line no-var
  var session: SessionResponse;
  // eslint-disable-next-line no-var
  var testRequest: supertest.SuperTest<supertest.Test>;
}

beforeAll(async () => {
  const connection = await createDatabaseConnection();

  global.testRequest = supertest(app);

  await createUserAdmin(connection);

  global.session = await createSession();
});

afterEach(async () => {
  const entities = getConnection().entityMetadatas;

  const deleteAllUserButAdmin = (userEntity: EntityMetadata) =>
    userEntity.connection.query('delete from users where "isAdmin" != true');

  const entityDeletionPromises = entities.map((entity) => {
    return entity.tableName == 'users'
      ? deleteAllUserButAdmin(entity)
      : entity.connection.query(`TRUNCATE TABLE ${entity.tableName} CASCADE;`);
  });

  await Promise.all(entityDeletionPromises);
});

afterAll(async () => {
  const connection = getConnection();

  connection.close();
});
