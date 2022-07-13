import dayjs from 'dayjs';

import ICreateRentalDTO from '@modules/rentals/dtos/ICreateRentalDTO';
import RentalsRepository from '@modules/rentals/infra/typeorm/repositories/RentalsRepository';
import DayjsDateProvider from '@shared/container/providers/DateProvider/DayjsDateProvider';
import AppError from '@shared/errors/AppError';
import CreateRentalUseCase from './CreateRentalUseCase';

import CategoriesRepository from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import CarsRepository from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import UsersRepository from '@modules/accounts/infra/typeorm/repositories/UsersRepository';

let createRentalUseCase: CreateRentalUseCase;

let rentalsRepository: RentalsRepository;

let dayjsDateProvider: DayjsDateProvider;

let carId: string;

let userId: string;

describe('#CreateRental', () => {
  const addTwoDays = dayjs().add(2, 'day').toDate();

  beforeEach(async () => {
    rentalsRepository = new RentalsRepository();

    dayjsDateProvider = new DayjsDateProvider();

    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepository,
      dayjsDateProvider
    );

    const categoriesRepository = new CategoriesRepository();

    const carsRepository = new CarsRepository();

    const usersRepository = new UsersRepository();

    const categoryId = (
      await categoriesRepository.create({
        name: 'categorie name',
        description: 'categorie description'
      })
    ).id;

    carId = (
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

    userId = (await usersRepository.findByEmail('test email'))?.id as string;
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      userId,
      carId,
      expectedReturnDate: addTwoDays
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it("shloud not be able to create a new rental if there's another one open for the same user", async () => {
    const data: Omit<ICreateRentalDTO, 'carId'> = {
      userId,
      expectedReturnDate: addTwoDays
    };

    await createRentalUseCase.execute({ ...data, carId });

    expect(
      createRentalUseCase.execute({ ...data, carId })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("shloud not be able to create a new rental if there's another one open for the same car", async () => {
    const data: Omit<ICreateRentalDTO, 'userId'> = {
      carId,
      expectedReturnDate: addTwoDays
    };

    await createRentalUseCase.execute({ ...data, userId });

    expect(
      createRentalUseCase.execute({ ...data, userId })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental with invalid return time', async () => {
    const data: ICreateRentalDTO = {
      userId,
      carId,
      expectedReturnDate: dayjs().toDate()
    };

    expect(createRentalUseCase.execute(data)).rejects.toBeInstanceOf(AppError);
  });
});
