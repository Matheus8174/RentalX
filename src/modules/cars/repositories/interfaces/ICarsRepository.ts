import ICreateCarDTO from '@modules/cars/dtos/ICreateCarDTO';
import Car from '@modules/cars/infra/typeorm/entities/Car';

export type FindAvailableParams = {
  brand?: string;
  category_id?: string;
  name?: string;
};

interface ICarsRepository {
  findAvailable({
    name,
    brand,
    category_id
  }: FindAvailableParams): Promise<Car[]>;
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(licensePlate: string): Promise<Car | undefined>;
  findById(carId: string): Promise<Car | undefined>;
  save(data: ICreateCarDTO): Promise<void>;
  updateAvailable(carId: string, available: boolean): Promise<void>;
}

export default ICarsRepository;
