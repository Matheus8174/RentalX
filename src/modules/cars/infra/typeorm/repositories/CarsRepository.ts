import { getRepository, Repository } from 'typeorm';

import ICreateCarDTO from '@modules/cars/dtos/ICreateCarDTO';
import Car from '@modules/cars/infra/typeorm/entities/Car';
import ICarsRepository, {
  FindAvailableParams
} from '@modules/cars/repositories/interfaces/ICarsRepository';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  public async findAvailable({
    name,
    brand,
    category_id
  }: FindAvailableParams) {
    const carsQuery = this.repository
      .createQueryBuilder('c')
      .where('available = :available', { available: true });

    if (brand) carsQuery.andWhere('brand = :brand', { brand });

    if (name) carsQuery.andWhere('name = :name', { name });

    if (category_id) {
      carsQuery.andWhere('category_id = :category_id', { category_id });
    }

    const listOfCars = await carsQuery.getMany();

    return listOfCars;
  }

  public async create(data: ICreateCarDTO) {
    const newCar = this.repository.create(data);

    return await this.repository.save(newCar);
  }

  public async save(data: ICreateCarDTO) {
    await this.repository.save(data);
  }

  public async findByLicensePlate(licensePlate: string) {
    const carFinded = await this.repository.findOne({
      where: { license_plate: licensePlate }
    });

    return carFinded;
  }

  public async findById(carId: string) {
    const carFinded = await this.repository.findOne({ where: { id: carId } });

    return carFinded;
  }

  public async updateAvailable(carId: string, available: boolean) {
    await this.repository
      .createQueryBuilder()
      .update({ available })
      .where('id = :carId')
      // esse :carId é um parametro que precisa ser definido no setParameters,
      // pro typeorm saber o valor dele.
      // Ele vai atualizar o car que tiver id = carId
      .setParameters({ carId })
      .execute();
  }
}

export default CarsRepository;
