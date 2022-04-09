import AuthenticateUserUseCase from './AuthenticateUserUseCase';
import CreateUserUseCase from '../createUser/CreateUserUseCase';
import UsersRepository from '@modules/accounts/repositories/UsersRepository';
import AppError from '@errors/AppError';

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe('#AuthenticateUser', () => {
  beforeAll(() => {
    const usersRepository = new UsersRepository();

    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  it('should not be able to authenticate a user with email wrong', async () => {
    const createUser = {
      name: 'test name',
      password: 'test password',
      email: 'testemail@gmail.com',
      driver_license: 'test'
    };

    const authenticate = {
      email: 'emailwrong@gmail.com',
      password: createUser.password
    };

    await createUserUseCase.execute(createUser);

    expect(
      authenticateUserUseCase.execute(authenticate)
    ).rejects.toBeInstanceOf(AppError);

    expect(
      authenticateUserUseCase.execute(authenticate)
    ).rejects.toHaveProperty('message', 'email or password incorrect');
  });

  it('should not be able to authenticate a user with password wrong', async () => {
    const createUser = {
      name: 'test name',
      password: 'test password',
      email: 'testemail@gmail.com',
      driver_license: 'test'
    };

    const authenticate = {
      email: createUser.email,
      password: 'password wrong'
    };

    await createUserUseCase.execute(createUser);

    expect(
      authenticateUserUseCase.execute(authenticate)
    ).rejects.toBeInstanceOf(AppError);

    expect(
      authenticateUserUseCase.execute(authenticate)
    ).rejects.toHaveProperty('message', 'email or password incorrect');
  });

  it('should be able to authenticate a user', async () => {
    const createUser = {
      name: 'test name2',
      password: 'testPassword12',
      email: 'testemail@gmail.com',
      driver_license: 'test'
    };

    await createUserUseCase.execute(createUser);

    const response = await authenticateUserUseCase.execute({
      password: createUser.password,
      email: createUser.email
    });

    expect(response).toHaveProperty('user', {
      email: createUser.email,
      name: createUser.name
    });

    expect(response).toHaveProperty('token');
  });
});
