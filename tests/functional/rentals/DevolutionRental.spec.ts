import dayjs from 'dayjs';

import UsersRepository from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import CarsRepository from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import CategoriesRepository from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import RentalsRepository from '@modules/rentals/infra/typeorm/repositories/RentalsRepository';
import CreateRentalUseCase from '@modules/rentals/usecases/createRental/CreateRentalUseCase';
import Rental from '@modules/rentals/infra/typeorm/entities/Rental';
import DayjsDateProvider from '@shared/container/providers/DateProvider/DayjsDateProvider';

let rental: Rental;

describe('#POST /rentals/devolution:id', () => {
  beforeAll(async () => {
    const categoriesRepository = new CategoriesRepository();

    const carsRepository = new CarsRepository();

    const usersRepository = new UsersRepository();

    const categoryId = (
      await categoriesRepository.create({
        name: 'categorie name 3',
        description: 'categorie description'
      })
    ).id;

    const carId = (
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
      name: 'test name 3',
      email: 'test email 3',
      driver_license: 'driver license test',
      password: '123456'
    });

    const userId = (await usersRepository.findByEmail('test email 3'))
      ?.id as string;

    const rentalsRepository = new RentalsRepository();

    const dayjsDateProvider = new DayjsDateProvider();

    const expectedReturnDate = dayjs().add(4, 'day').toDate();

    const createRentalUseCase = new CreateRentalUseCase(
      rentalsRepository,
      dayjsDateProvider,
      carsRepository
    );

    rental = await createRentalUseCase.execute({
      userId,
      carId,
      expectedReturnDate
    });
  });

  it.skip('should be able to make a devolution', async () => {
    const { status, body } = await global.testRequest
      .post(`/api/v1/rentals/devolution/${rental.id}`)
      .set({
        Authorization: `Bearer ${global.session.refreshToken}`
      });

    console.log(body);

    expect(status).toBe(200);
  });
});
