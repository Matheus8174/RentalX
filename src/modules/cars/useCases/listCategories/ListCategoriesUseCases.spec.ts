import ListCategoriesUseCases from './ListCategoriesUseCases';
import CategoriesRepository from '../../repositories/CategoriesRepository';

let listCategoriesUseCases: ListCategoriesUseCases;

let categoriesRepository: CategoriesRepository;

describe('#ListCategories', () => {
  beforeAll(() => {
    categoriesRepository = new CategoriesRepository();

    listCategoriesUseCases = new ListCategoriesUseCases(categoriesRepository);
  });

  it('Should return all the categories stored in database', async () => {
    const data = {
      name: 'test',
      description: 'test'
    };

    await categoriesRepository.create(data);

    const response = await listCategoriesUseCases.execute();

    expect(response).toHaveLength(1);
    expect(response).toEqual(
      expect.arrayContaining([expect.objectContaining(data)])
    );
  });
});
