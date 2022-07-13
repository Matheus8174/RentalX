import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateRentalUseCase from './CreateRentalUseCase';

class CreateRentalController {
  public async execute(request: Request, response: Response) {
    const { expected_return_date, car_id } = request.body;
    const { id } = request.user;

    const createRentalUseCase = container.resolve(CreateRentalUseCase);

    const rental = await createRentalUseCase.execute({
      carId: car_id,
      expectedReturnDate: expected_return_date,
      userId: id
    });

    return response.status(201).json(rental);
  }
}

export default CreateRentalController;
