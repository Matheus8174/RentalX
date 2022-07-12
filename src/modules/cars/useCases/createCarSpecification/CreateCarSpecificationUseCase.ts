import { injectable, inject } from 'tsyringe';

import ICarsRepository from '@modules/cars/repositories/interfaces/ICarsRepository';
import ISpecificationsRepository from '@modules/cars/repositories/interfaces/ISpecificationsRepository';
import AppError from '@shared/errors/AppError';
import Car from '@modules/cars/infra/typeorm/entities/Car';

type Request = {
  carId: string;
  specificationId: string[];
};

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarsRepository')
    private readonly carsRepository: ICarsRepository,
    @inject('SpecificationsRepository')
    private readonly specificationsRepository: ISpecificationsRepository
  ) {}

  public async execute({ carId, specificationId }: Request): Promise<Car> {
    const carExists = await this.carsRepository.findById(carId);

    if (!carExists) throw new AppError('Car does not exists!');

    const specifications = await this.specificationsRepository.findByIds(
      specificationId
    );

    carExists.specifications = specifications;

    await this.carsRepository.save(carExists);

    return carExists;
  }
}

export default CreateCarSpecificationUseCase;
