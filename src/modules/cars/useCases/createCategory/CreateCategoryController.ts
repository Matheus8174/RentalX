import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCategoryUseCase from './CreateCategoryUseCase';

class CreateCategoryController {
  public async execute(request: Request, response: Response) {
    const { name, description } = request.body;

    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

    try {
      await createCategoryUseCase.execute({ name, description });
    } catch ({ message }) {
      return response.status(409).json({ message });
    }

    return response.status(201).end();
  }
}

export default CreateCategoryController;
