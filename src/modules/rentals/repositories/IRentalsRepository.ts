import Rental from '@modules/rentals/infra/typeorm/entities/Rental';
import ICreateRentalDTO from '../dtos/ICreateRentalDTO';

interface IRentalsRepository {
  findOpenRentalByCar(caId: string): Promise<Rental | undefined>;
  findOpenRentalByUser(userId: string): Promise<Rental | undefined>;
  create(data: ICreateRentalDTO): Promise<Rental>;
}

export default IRentalsRepository;
