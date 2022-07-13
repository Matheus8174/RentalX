import { compare } from 'bcrypt';

import CreateUserUseCase from './CreateUserUseCase';
import UsersRepository from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';

let createUserUseCase: CreateUserUseCase;

let usersRepository: UsersRepository;

describe('#CreateUser', () => {
  beforeAll(() => {
    usersRepository = new UsersRepository();

    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  it('should be able to create a new user', async () => {
    const data = {
      name: 'test name',
      email: 'test email',
      driver_license: 'driver license test'
    };

    await createUserUseCase.execute({ ...data, password: 'password test' });

    const user = await usersRepository.findByEmail(data.email);

    expect(user).toEqual(expect.objectContaining(data));
  });

  it('should to encrypt the password', async () => {
    const data = {
      name: 'test name 2',
      email: 'test email',
      driver_license: 'driver license test',
      password: 'password test'
    };

    await createUserUseCase.execute(data);

    const user = await usersRepository.findByEmail(data.email);

    expect(user).toBeTruthy();

    if (user) expect(compare(data.password, user.password)).resolves.toBe(true);
  });

  it('should not be able to create a user that already exists', async () => {
    const data = {
      name: 'test name 2',
      email: 'test email',
      driver_license: 'driver license test',
      password: 'password test'
    };

    await createUserUseCase.execute(data);

    expect(createUserUseCase.execute(data)).rejects.toBeInstanceOf(AppError);
  });
});
