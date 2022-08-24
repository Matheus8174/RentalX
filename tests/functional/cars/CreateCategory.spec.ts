import CategoriesRepository from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { ICreateCategoryDTO } from '@modules/cars/repositories/interfaces/ICategoriesRepository';

describe('#POST /categories', () => {
  it('should not be able to create a new category with a name that exists', async () => {
    const categoryData: ICreateCategoryDTO = {
      name: 'name category test',
      description: 'description category test'
    };

    const categoriesRepository = new CategoriesRepository();

    await categoriesRepository.create(categoryData);

    const response = await global.testRequest
      .post('/api/v1/categories')
      .send(categoryData)
      .set({
        Authorization: `Bearer ${global.session.refreshToken}`
      });

    expect(response.status).toBe(409);
  });

  it('should be able to create a new category', async () => {
    const response = await global.testRequest
      .post('/api/v1/categories')
      .send({
        name: 'name category test',
        description: 'description category test'
      })
      .set({
        Authorization: `Bearer ${global.session.refreshToken}`
      });

    expect(response.status).toBe(201);
  });
});
