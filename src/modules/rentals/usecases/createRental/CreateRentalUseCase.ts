import { inject, injectable } from 'tsyringe';

import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';
import ICarsRepository from '@modules/cars/repositories/interfaces/ICarsRepository';

import AppError from '@shared/errors/AppError';
import IDateProvider from '@shared/container/providers/DateProvider/interfaces/IDateProvider';

type Request = {
  userId: string;
  carId: string;
  expectedReturnDate: Date;
};

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private readonly rentalsRepository: IRentalsRepository,
    @inject('DayjsDateProvider')
    private readonly dateProvider: IDateProvider,
    @inject('CarsRepository')
    private readonly carsRepository: ICarsRepository
  ) {}

  public async execute({ userId, carId, expectedReturnDate }: Request) {
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      carId
    );

    if (carUnavailable) {
      throw new AppError('Car is unavailable');
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      userId
    );

    if (rentalOpenToUser) {
      throw new AppError("there's a rental in progress for user");
    }

    const dateNow = this.dateProvider.dateNow();

    const compare = this.dateProvider.compareInHours(
      dateNow,
      expectedReturnDate
    );

    if (compare < 24) {
      throw new AppError('Invalid return time');
    }

    const newRental = await this.rentalsRepository.create({
      userId,
      carId,
      expectedReturnDate
    });

    await this.carsRepository.updateAvailable(carId, false);

    return newRental;
  }
}

export default CreateRentalUseCase;
