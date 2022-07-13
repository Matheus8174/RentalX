import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCarSpecificationUseCase from './CreateCarSpecificationUseCase';

class CreateCarSpecificationController {
  public async execute(request: Request, response: Response) {
    const { carId } = request.params;
    const { specificationId } = request.body;

    const createCarSpecificationUseCase = container.resolve(
      CreateCarSpecificationUseCase
    );

    const car = await createCarSpecificationUseCase.execute({
      carId,
      specificationId
    });

    return response.status(201).json(car);
  }
}

export default CreateCarSpecificationController;
