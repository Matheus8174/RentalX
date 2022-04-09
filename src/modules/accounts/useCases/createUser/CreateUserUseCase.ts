import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';

import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import IUsersRepository from '@modules/accounts/repositories/interfaces/IUsersRepository';
import AppError from '@errors/AppError';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private readonly usersRepository: IUsersRepository
  ) {}

  public async execute({ email, password, ...rest }: ICreateUserDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('User already exists');
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      ...rest,
      email,
      password: passwordHash
    });
  }
}

export default CreateUserUseCase;
