import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import UsersRepository from '@modules/accounts/infra/typeorm/repositories/UsersRepository';

async function ensureAuthenticated(
  request: Request,
  _: Response,
  next: NextFunction
) {
  const barerToken = request.headers.authorization;

  if (!barerToken) throw new AppError('Token is missing', 401);

  const [, token] = barerToken.split(' ');

  try {
    const { sub: user_id } = verify(token, process.env.JWT_SECRET);

    const userRepository = new UsersRepository();

    const user = await userRepository.findById(user_id as string);

    if (!user) throw new AppError('User does not exists', 401);

    request.user = {
      id: user_id as string
    };

    next();
  } catch {
    throw new AppError('Invalid token', 401);
  }
}

export default ensureAuthenticated;
