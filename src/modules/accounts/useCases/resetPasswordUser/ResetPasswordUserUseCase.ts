import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';

import IUsersRepository from '@modules/accounts/repositories/interfaces/IUsersRepository';
import IDateProvider from '@shared/container/providers/DateProvider/interfaces/IDateProvider';
import IUsersTokensRepository from '@modules/accounts/repositories/interfaces/IUsersTokensRepository';
import AppError from '@shared/errors/AppError';

type Request = {
  token: string;
  password: string;
};

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject('UserRepository')
    private readonly usersRepository: IUsersRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository
  ) {}

  public async execute({ password, token }: Request) {
    const userToken = await this.usersTokensRepository.findByRefreshToken(
      token
    );

    if (!userToken) throw new AppError('Token invalid');

    const compareIfBefore = this.dateProvider.compareIfBefore(
      userToken.expires_date,
      this.dateProvider.dateNow()
    );

    if (compareIfBefore) throw new AppError('token expired');

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) throw new AppError('User not found');

    user.password = await hash(password, 8);

    await this.usersRepository.create(user);

    await this.usersTokensRepository.deleteById(userToken.id);
  }
}

export default ResetPasswordUserUseCase;
