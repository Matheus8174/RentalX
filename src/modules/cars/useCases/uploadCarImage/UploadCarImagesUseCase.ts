import { inject, injectable } from 'tsyringe';
import CarsImagesRepository from '@modules/cars/infra/typeorm/repositories/CarsImageRepository';

interface IRequest {
  carId: string;
  imagesName: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private readonly carsImagesRepository: CarsImagesRepository
  ) {}

  async execute({ carId, imagesName }: IRequest) {
    imagesName.map(async (image) => {
      await this.carsImagesRepository.create(carId, image);
    });

    //as imagens não estão sendo persistidas em nenhum lugar
  }
}

export default UploadCarImagesUseCase;
