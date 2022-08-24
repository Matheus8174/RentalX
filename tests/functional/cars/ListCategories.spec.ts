import CategoriesRepository from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';

describe('#GET /categories', () => {
  it('should list all categories stored', async () => {
    const categoriesRepository = new CategoriesRepository();

    const data = {
      name: 'test',
      description: 'test'
    };

    await categoriesRepository.create(data);

    const allCategories = await global.testRequest
      .get('/api/v1/categories')
      .set({
        Authorization: `Bearer ${global.session.refreshToken}`
      });

    expect(allCategories.body).toEqual(
      expect.arrayContaining([expect.objectContaining(data)])
    );

    expect(allCategories.status).toBe(200);
  });
});
