import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import UpdateUserAvatarUseCase from './UpdateUserAvatarUseCase';

class UpdateUserAvatarController {
  public async execute(request: Request, response: Response) {
    const {
      file,
      user: { id }
    } = request;

    if (!file) throw new AppError('file is missing');

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    await updateUserAvatarUseCase.execute({ userId: id, file });

    response.status(204).end();
  }
}

export default UpdateUserAvatarController;
