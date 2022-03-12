import { Request, Response } from 'express';
import CreateSpecificationUseCase from './CreateSpecificationUseCase';

class CreateSpecificationController {
  constructor(
    private readonly createSpecificationUseCase: CreateSpecificationUseCase
  ) {}

  public execute(request: Request, response: Response) {
    const { name, description } = request.body;

    try {
      this.createSpecificationUseCase.execute(name, description);
    } catch ({ message }) {
      return response.status(400).json({ message });
    }

    return response.status(201).end();
  }
}

export default CreateSpecificationController;
