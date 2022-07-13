import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UploadCarImagesUseCase from './UploadCarImagesUseCase';

class UploadCarImagesController {
  async execute(request: Request, response: Response) {
    const { carId } = request.params;
    const images = request.files as Express.Multer.File[];

    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);

    const imagesName = images.map((file) => file.originalname);

    await uploadCarImagesUseCase.execute({
      carId,
      imagesName
    });

    return response.status(201).end();
  }
}

export default UploadCarImagesController;
