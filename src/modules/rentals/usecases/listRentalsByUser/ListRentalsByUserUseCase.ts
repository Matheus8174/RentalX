import IRentalsRepository from '@modules/rentals/repositories/IRentalsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject('RentalsRepository')
    private readonly rentalsRepository: IRentalsRepository
  ) {}

  public async execute(userId: string) {
    const rentals = await this.rentalsRepository.findByUser(userId);

    return rentals;
  }
}

export default ListRentalsByUserUseCase;
