import Rental from '@modules/rentals/infra/typeorm/entities/Rental';
import ICreateRentalDTO from '../dtos/ICreateRentalDTO';

export type ISaveRental = Omit<
  ICreateRentalDTO,
  'userId' | 'carId' | 'expectedReturnDate'
>;

interface IRentalsRepository {
  findOpenRentalByCar(caId: string): Promise<Rental | undefined>;
  findOpenRentalByUser(userId: string): Promise<Rental | undefined>;
  create(data: ICreateRentalDTO): Promise<Rental>;
  save(data: ISaveRental): Promise<void>;
  findById(id: string): Promise<Rental | undefined>;
  findByUser(userId: string): Promise<Rental[]>;
}

export default IRentalsRepository;
