import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordUserUseCase from './ResetPasswordUserUseCase';

class ResetPasswordUserController {
  public async execute(request: Request, response: Response) {
    const { token } = request.query;
    const { password } = request.body;

    const resetPasswordUserUseCase = container.resolve(
      ResetPasswordUserUseCase
    );

    await resetPasswordUserUseCase.execute({ password, token: String(token) });

    return response.end();
  }
}

export default ResetPasswordUserController;
