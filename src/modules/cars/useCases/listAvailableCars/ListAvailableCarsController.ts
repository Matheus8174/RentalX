import { request, Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindAvailableParams } from '@modules/cars/repositories/interfaces/ICarsRepository';
import ListAvailableCarsUseCase from './ListAvailableCarsUseCase';

class ListAvailableCarsController {
  public async execute(_: Request, response: Response) {
    const { name, brand, category_id }: FindAvailableParams = request.query;

    const listAvailableCarsUseCase = container.resolve(
      ListAvailableCarsUseCase
    );

    const allCars = await listAvailableCarsUseCase.execute({
      name,
      brand,
      category_id
    });

    return response.status(200).json(allCars);
  }
}

export default ListAvailableCarsController;
