import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import ICategoriesRepository from '@modules/cars/repositories/interfaces/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private readonly categoriesRepository: ICategoriesRepository
  ) {}

  public async execute({ name, description }: IRequest) {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) throw new AppError('category already exists');

    await this.categoriesRepository.create({ name, description });
  }
}

export default CreateCategoryUseCase;
