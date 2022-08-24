import AuthenticateUserUseCase from '@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase';

import UsersRepository from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import UsersTokensRepository from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import DayjsDateProvider from '@shared/container/providers/DateProvider/DayjsDateProvider';

async function createSession() {
  const usersRepository = new UsersRepository();
  const usersTokensRepository = new UsersTokensRepository();
  const dayjsDateProvider = new DayjsDateProvider();

  const authenticateUserUseCase = new AuthenticateUserUseCase(
    usersRepository,
    usersTokensRepository,
    dayjsDateProvider
  );

  const session = await authenticateUserUseCase.execute({
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD
  });

  return session;
}

export default createSession;
