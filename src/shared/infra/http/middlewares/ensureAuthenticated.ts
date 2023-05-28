import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';

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

    request.user = {
      id: String(user_id)
    };

    next();
  } catch (error) {
    console.log('ERROR', error);
    throw new AppError('Invalid token', 401);
  }
}

export default ensureAuthenticated;
