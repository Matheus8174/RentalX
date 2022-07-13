import AuthenticateUserUseCase from '@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase';
import UsersRepository from '@modules/accounts/infra/typeorm/repositories/UsersRepository';

async function createSession() {
  const usersRepository = new UsersRepository();

  const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);

  const session = await authenticateUserUseCase.execute({
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD
  });

  return session;
}

export default createSession;
