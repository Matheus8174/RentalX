import ICategoriesRepository from '../../repositories/interfaces/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private readonly categoriesRepository: ICategoriesRepository) {}

  public execute({ name, description }: IRequest) {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) throw new Error('category already exists');

    this.categoriesRepository.create({ name, description });
  }
}

export default CreateCategoryUseCase;
