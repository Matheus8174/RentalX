import Category from '../../infra/typeorm/entities/Category';

export interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  create({ name, description }: ICreateCategoryDTO): Promise<Category>;
  findByName(categoryName: string): Promise<Category | undefined>;
  list(): Promise<Category[]>;
}

export default ICategoriesRepository;
