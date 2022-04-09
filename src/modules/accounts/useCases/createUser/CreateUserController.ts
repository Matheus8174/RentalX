import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserUseCase from './CreateUserUseCase';

class CreateUserController {
  public async execute(request: Request, response: Response) {
    const { name, password, email, driver_license } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      name,
      password,
      email,
      driver_license
    });

    response.status(201).end();
  }
}

export default CreateUserController;
