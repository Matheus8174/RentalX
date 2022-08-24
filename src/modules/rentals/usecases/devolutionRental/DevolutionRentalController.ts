import { Request, Response } from 'express';
import { container } from 'tsyringe';
import DevolutionRentalUseCase from './DevolutionRentalUseCase';

class DevolutionRentalController {
  public async execute(request: Request, response: Response) {
    const { id: userId } = request.user;
    const { id } = request.params;

    const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase);

    const rental = await devolutionRentalUseCase.execute({
      id,
      userId
    });

    return response.status(200).json(rental);
  }
}

export default DevolutionRentalController;
