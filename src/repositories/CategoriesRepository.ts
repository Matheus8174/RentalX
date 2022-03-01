import Category from '../model/Category';

import ICategoriesRepository, {
  ICreateCategoryDTO
} from './interfaces/ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private readonly categories: Category[] = [];

  public create({ name, description }: ICreateCategoryDTO) {
    const category = new Category(name, description, new Date());

    this.categories.push(category);
  }

  public list() {
    const allCategories = this.categories;

    return allCategories;
  }

  public findByName(categoryName: string) {
    const isThisCategoryNameExists = this.categories.find(
      (category) => category.name === categoryName
    );

    return isThisCategoryNameExists;
  }
}

export default CategoriesRepository;
