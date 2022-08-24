import { inject, injectable } from 'tsyringe';

import ICarsRepository from '@modules/cars/repositories/interfaces/ICarsRepository';
import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';
import IDateProvider from '@shared/container/providers/DateProvider/interfaces/IDateProvider';

import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  userId: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private readonly rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private readonly carsRepository: ICarsRepository,
    @inject('DayjsDateProvider')
    private readonly dateProvider: IDateProvider
  ) {}

  public async execute({ id, userId }: IRequest) {
    const rental = await this.rentalsRepository.findById(id);

    if (!rental) throw new AppError('rental does not exists');

    const car = await this.carsRepository.findById(rental.car_id);

    if (!car) throw new AppError('car does not exists');

    const minimumDaily = 1;

    const dateNow = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareInDays(rental.start_date, dateNow);

    if (daily <= 0) daily = minimumDaily;

    const delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_return_date
    );

    let total = 0;

    if (delay > 0) {
      const calculateFine = delay * car.fine_amount;

      total = calculateFine;
    }

    total += daily * car.daily_rate;

    rental.end_date = dateNow;
    rental.total = total;

    await this.rentalsRepository.save(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export default DevolutionRentalUseCase;
