import ICarImagesRepository from '@modules/cars/repositories/interfaces/ICarImagesRepository';
import { getRepository, Repository } from 'typeorm';
import CarImage from '../entities/CarImage';

class CarsImageRepository implements ICarImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  async create(carId: string, imageName: string) {
    const carImage = this.repository.create({
      car_id: carId,
      image_name: imageName
    });

    return await this.repository.save(carImage);
  }
}

export default CarsImageRepository;
