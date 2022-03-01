import Category from '../../model/Category';

export interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  create({ name, description }: ICreateCategoryDTO): void;
  findByName(categoryName: string): Category | undefined;
  list(): Category[];
}

export default ICategoriesRepository;
