import CreateCategoryUseCase from './CreateCategoryUseCase';
import CategoriesRepository from '@modules/cars/repositories/CategoriesRepository';
import AppError from '@errors/AppError';

let createCategoryUseCase: CreateCategoryUseCase;

let categoriesRepository: CategoriesRepository;

describe('#CreateCategory', () => {
  beforeAll(() => {
    categoriesRepository = new CategoriesRepository();

    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
  });

  it('should be able to create a new category', async () => {
    const data = {
      name: 'test',
      description: 'test'
    };

    await createCategoryUseCase.execute(data);

    const response = await categoriesRepository.findByName(data.name);

    expect(response).toEqual(expect.objectContaining(data));
  });

  it('should not be able to create a new category with a name that exists', async () => {
    const data = {
      name: 'test',
      description: 'test'
    };

    await createCategoryUseCase.execute(data);

    expect(createCategoryUseCase.execute(data)).rejects.toBeInstanceOf(
      AppError
    );
  });
});
