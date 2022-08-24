import { inject, injectable } from 'tsyringe';
import { sign, verify } from 'jsonwebtoken';

import IUsersTokensRepository from '@modules/accounts/repositories/interfaces/IUsersTokensRepository';
import IDateProvider from '@shared/container/providers/DateProvider/interfaces/IDateProvider';

import AppError from '@shared/errors/AppError';

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private readonly usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private readonly dateProvider: IDateProvider
  ) {}

  public async execute(token: string) {
    const decoded = verify(token, process.env.SECRET_REFRESH_TOKEN) as {
      sub: string;
      email: string;
    };

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        decoded.sub,
        token
      );

    if (!userToken) throw new AppError('Refresh token does not exists');

    await this.usersTokensRepository.deleteById(userToken.id);

    const refreshToken = sign(
      { userEmail: decoded.email },
      process.env.SECRET_REFRESH_TOKEN,
      {
        subject: decoded.sub,
        expiresIn: process.env.EXPIRES_IN_REFRESH_TOKEN
      }
    );

    const expiresDate = this.dateProvider.addDays(
      process.env.EXPIRES_REFRESH_TOKEN_DAYS
    );

    await this.usersTokensRepository.create({
      refreshToken,
      userId: decoded.sub,
      expiresDate
    });

    const newToken = sign({}, process.env.JWT_SECRET, {
      subject: decoded.sub,
      expiresIn: process.env.EXPIRES_IN
    });

    return {
      refreshToken,
      token: newToken
    };
  }
}

export default RefreshTokenUseCase;
