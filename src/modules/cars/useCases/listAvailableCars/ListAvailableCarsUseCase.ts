import { injectable, inject } from 'tsyringe';

import { FindAvailableParams } from '@modules/cars/repositories/interfaces/ICarsRepository';
import CarsRepository from '@modules/cars/infra/typeorm/repositories/CarsRepository';

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private readonly carsRepository: CarsRepository
  ) {}

  public async execute({ name, brand, category_id }: FindAvailableParams) {
    const allCars = await this.carsRepository.findAvailable({
      name,
      brand,
      category_id
    });

    return allCars;
  }
}

export default ListAvailableCarsUseCase;
