import UsersRepository from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';

async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user;

  const userRepository = new UsersRepository();

  const user = await userRepository.findById(id);

  if (!user?.isAdmin) throw new AppError('user is not a admin');

  return next();
}

export default ensureAdmin;
