import { inject, injectable } from 'tsyringe';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import IUserRepository from '@modules/accounts/repositories/interfaces/IUsersRepository';
import IUsersTokensRepository from '@modules/accounts/repositories/interfaces/IUsersTokensRepository';
import IDateProvider from '@shared/container/providers/DateProvider/interfaces/IDateProvider';

import AppError from '@shared/errors/AppError';

type Response = {
  user: {
    name: string;
    email: string;
  };
  refreshToken: string;
  token: string;
};

type Request = {
  email: string;
  password: string;
};

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UserRepository')
    private readonly userRepository: IUserRepository,
    @inject('UsersTokensRepository')
    private readonly usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private readonly dateProvider: IDateProvider
  ) {}

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new AppError('email or password incorrect');

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new AppError('email or password incorrect');

    const token = sign({}, process.env.JWT_SECRET, {
      subject: user.id,
      expiresIn: process.env.EXPIRES_IN
    });

    const refreshToken = sign(
      { userEmail: email },
      process.env.SECRET_REFRESH_TOKEN,
      {
        subject: user.id,
        expiresIn: process.env.EXPIRES_IN_REFRESH_TOKEN
      }
    );

    await this.usersTokensRepository.create({
      userId: user.id,
      refreshToken,
      expiresDate: this.dateProvider.addDays(
        process.env.EXPIRES_REFRESH_TOKEN_DAYS
      )
    });

    const userInfo = {
      name: user.name,
      email: user.email
    };

    return {
      user: userInfo,
      token,
      refreshToken
    };
  }
}

export default AuthenticateUserUseCase;
