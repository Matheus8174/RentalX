import { getRepository, Repository } from 'typeorm';

import Category from '../entities/Category';

import ICategoriesRepository, {
  ICreateCategoryDTO
} from '../../../repositories/interfaces/ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  public async create({ name, description }: ICreateCategoryDTO) {
    const newCategory = this.repository.create({ name, description });

    return await this.repository.save(newCategory);
  }

  public async list() {
    const allCategories = await this.repository.find();

    return allCategories;
  }

  public async findByName(categoryName: string) {
    const categoryFinded = await this.repository.findOne({
      where: { name: categoryName }
    });

    return categoryFinded;
  }
}

export default CategoriesRepository;
