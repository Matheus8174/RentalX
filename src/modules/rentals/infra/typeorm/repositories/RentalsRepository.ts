import { getRepository, Repository } from 'typeorm';

import ICreateRentalDTO from '@modules/rentals/dtos/ICreateRentalDTO';
import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';

import Rental from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  public async findOpenRentalByCar(carId: string) {
    const rental = await this.repository.findOne({ car_id: carId });

    return rental;
  }

  public async findOpenRentalByUser(userId: string) {
    const rental = await this.repository.findOne({ user_id: userId });

    return rental;
  }

  public async create({ carId, userId, expectedReturnDate }: ICreateRentalDTO) {
    const rental = this.repository.create({
      car_id: carId,
      user_id: userId,
      expected_return_date: expectedReturnDate
    });

    await this.repository.save(rental);

    return rental;
  }
}

export default RentalsRepository;
