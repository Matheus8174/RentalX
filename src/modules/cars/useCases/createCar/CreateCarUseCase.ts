import { injectable, inject } from 'tsyringe';

import ICarsRepository from '@modules/cars/repositories/interfaces/ICarsRepository';
import ICreateCarDTO from '@modules/cars/dtos/ICreateCarDTO';
import AppError from '@shared/errors/AppError';

@injectable()
class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  public async execute(data: ICreateCarDTO) {
    const CarAlreadyExists = await this.carsRepository.findByLicensePlate(
      data.license_plate
    );

    if (CarAlreadyExists)
      throw new AppError('Already exists a car with that license plate');

    const carSaved = await this.carsRepository.create(data);

    return carSaved;
  }
}

export default CreateCarUseCase;
