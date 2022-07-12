import { inject, injectable } from 'tsyringe';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import IUserRepository from '@modules/accounts/repositories/interfaces/IUsersRepository';
import AppError from '@shared/errors/AppError';

type Response = {
  user: {
    name: string;
    email: string;
  };
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
    private readonly UserRepository: IUserRepository
  ) {}

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.UserRepository.findByEmail(email);

    if (!user) throw new AppError('email or password incorrect');

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new AppError('email or password incorrect');

    const token = sign({}, process.env.JWT_SECRET, {
      subject: user.id,
      expiresIn: process.env.EXPIRES_IN
    });

    const userInfo = {
      name: user.name,
      email: user.email
    };

    return {
      user: userInfo,
      token
    };
  }
}

export default AuthenticateUserUseCase;
