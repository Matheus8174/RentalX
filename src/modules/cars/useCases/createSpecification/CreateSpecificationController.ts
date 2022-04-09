import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSpecificationUseCase from './CreateSpecificationUseCase';

class CreateSpecificationController {
  public async execute(request: Request, response: Response) {
    const { name, description } = request.body;

    const createSpecificationUseCase = container.resolve(
      CreateSpecificationUseCase
    );

    try {
      await createSpecificationUseCase.execute({ name, description });
    } catch ({ message }) {
      return response.status(400).json({ message });
    }

    return response.status(201).end();
  }
}

export default CreateSpecificationController;
