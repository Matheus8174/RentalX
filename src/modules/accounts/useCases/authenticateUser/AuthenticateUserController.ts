import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserUseCase from './AuthenticateUserUseCase';

class AuthenticateUserController {
  public async execute(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const userAndToken = await authenticateUserUseCase.execute({
      email,
      password
    });

    response.json(userAndToken);
  }
}

export default AuthenticateUserController;
