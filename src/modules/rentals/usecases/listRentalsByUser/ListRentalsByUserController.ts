import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListRentalsByUserUseCase from './ListRentalsByUserUseCase';

class ListRentalsByUserController {
  public async execute(request: Request, response: Response) {
    const { id } = request.user;

    const listRentalsByUserUseCase = container.resolve(
      ListRentalsByUserUseCase
    );

    const rentals = await listRentalsByUserUseCase.execute(id);

    return response.json(rentals);
  }
}

export default ListRentalsByUserController;
