import { inject, injectable } from 'tsyringe';

import ICategoriesRepository from '@modules/cars/repositories/interfaces/ICategoriesRepository';

@injectable()
class ListCategoriesUseCases {
  constructor(
    @inject('CategoriesRepository')
    private readonly categoriesRepository: ICategoriesRepository
  ) {}

  public async execute() {
    const allCategories = await this.categoriesRepository.list();

    return allCategories;
  }
}

export default ListCategoriesUseCases;
