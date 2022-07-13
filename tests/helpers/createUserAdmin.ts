import { randomUUID } from 'crypto';
import { hash } from 'bcrypt';
import { Connection } from 'typeorm';

async function createUserAdmin(connection: Connection) {
  const id = randomUUID();
  const password = await hash(process.env.ADMIN_PASSWORD, 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
      values('${id}', 'admin', '${process.env.ADMIN_EMAIL}', '${password}', true, 'now()', 'xxxxxx')`
  );
}

export default createUserAdmin;
