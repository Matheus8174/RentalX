import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import ISpecificationsRepository from '@modules/cars/repositories/interfaces/ISpecificationsRepository';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private readonly specificationsRepository: ISpecificationsRepository
  ) {}

  public async execute({ name, description }: IRequest) {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists)
      throw new AppError('specification already exists');

    await this.specificationsRepository.create({ name, description });
  }
}

export default CreateSpecificationUseCase;
