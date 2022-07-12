import CarImage from '@modules/cars/infra/typeorm/entities/CarImage';

interface ICarImagesRepository {
  create(carId: string, imageName: string): Promise<CarImage>;
}

export default ICarImagesRepository;
