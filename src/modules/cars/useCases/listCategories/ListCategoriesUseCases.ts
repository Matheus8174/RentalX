import ICategoriesRepository from '../../repositories/interfaces/ICategoriesRepository';

class ListCategoriesUseCases {
  constructor(private readonly categoriesRepository: ICategoriesRepository) {}

  public execute() {
    const allCategories = this.categoriesRepository.list();

    return allCategories;
  }
}

export default ListCategoriesUseCases;
