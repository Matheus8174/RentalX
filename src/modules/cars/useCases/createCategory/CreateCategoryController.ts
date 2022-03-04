import CreateCategoryUseCase from './CreateCategoryUseCase';

import { Request, Response } from 'express';

class CreateCategoryController {
  constructor(private readonly createCategoryUseCase: CreateCategoryUseCase) {}

  public execute(request: Request, response: Response) {
    const { name, description } = request.body;

    try {
      this.createCategoryUseCase.execute({ name, description });
    } catch ({ message }) {
      return response.status(400).json({ message });
    }

    return response.status(201).end();
  }
}

export default CreateCategoryController;
