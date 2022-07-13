import dayjs from 'dayjs';

import UsersRepository from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import CarsRepository from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import CategoriesRepository from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';

const addTwoDays = dayjs().add(2, 'day').toDate();

let car_id: string;

let user_id: string;

describe('#CreateRentals', () => {
  beforeAll(async () => {
    const categoriesRepository = new CategoriesRepository();

    const carsRepository = new CarsRepository();

    const usersRepository = new UsersRepository();

    const categoryId = (
      await categoriesRepository.create({
        name: 'categorie name',
        description: 'categorie description'
      })
    ).id;

    car_id = (
      await carsRepository.create({
        available: true,
        brand: 'brand',
        category_id: categoryId,
        daily_rate: 62,
        description: 'some description for test',
        fine_amount: 12,
        license_plate: 'ABC-1234',
        name: 'CrossFox'
      })
    ).id;

    await usersRepository.create({
      name: 'test name',
      email: 'test email',
      driver_license: 'driver license test',
      password: '123456'
    });

    user_id = (await usersRepository.findByEmail('test email'))?.id as string;
  });

  it('should be able to create a new rental', async () => {
    const data = {
      car_id,
      user_id,
      expected_return_date: addTwoDays
    };

    const { body, status } = await global.testRequest
      .post('/api/v1/rentals')
      .send(data)
      .set({
        Authorization: `Bearer ${global.session.token}`
      });

    expect(status).toBe(201);
    expect(body).toHaveProperty('id');
  });
});
