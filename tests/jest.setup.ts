import supertest from 'supertest';
import { getConnection } from 'typeorm';

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

afterAll(async () => {
  const connection = getConnection('test');

  // await connection.dropDatabase();
  await connection.close();
});
