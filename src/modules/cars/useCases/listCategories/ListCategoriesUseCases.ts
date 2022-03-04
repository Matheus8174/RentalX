import CategoriesRepository from '../../repositories/CategoriesRepository';

class ListCategoriesUseCases {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  public execute() {
    const allCategories = this.categoriesRepository.list();

    return allCategories;
  }
}

export default ListCategoriesUseCases;
