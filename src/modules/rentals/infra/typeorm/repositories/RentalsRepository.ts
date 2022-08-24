import { getRepository, Repository } from 'typeorm';

import ICreateRentalDTO from '@modules/rentals/dtos/ICreateRentalDTO';
import IRentalsRepository, {
  ISaveRental
} from '@modules/rentals/repositories/IRentalsRepository';

import Rental from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  public async findOpenRentalByCar(carId: string) {
    const rental = await this.repository.findOne({
      where: { car_id: carId, end_date: null }
    });

    return rental;
  }

  public async findOpenRentalByUser(userId: string) {
    const rental = await this.repository.findOne({
      where: { user_id: userId, end_date: null }
    });

    return rental;
  }

  public async create({
    carId,
    userId,
    expectedReturnDate,
    total,
    id
  }: ICreateRentalDTO) {
    const rental = this.repository.create({
      car_id: carId,
      user_id: userId,
      expected_return_date: expectedReturnDate,
      total,
      id
    });

    await this.repository.save(rental);

    return rental;
  }

  public async findById(id: string) {
    const rental = await this.repository.findOne(id);

    return rental;
  }

  public async save(data: ISaveRental) {
    await this.repository.save(data);
  }

  public async findByUser(userId: string) {
    const rentals = await this.repository.find({
      where: { user_id: userId },
      relations: ['car']
    });

    return rentals;
  }
}

export default RentalsRepository;
