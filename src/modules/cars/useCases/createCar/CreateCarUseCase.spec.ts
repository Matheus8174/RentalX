import CreateCarUseCase from './CreateCarUseCase';

import CarsRepository from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import ICreateCarDTO from '@modules/cars/dtos/ICreateCarDTO';
import AppError from '@shared/errors/AppError';
import Car from '@modules/cars/infra/typeorm/entities/Car';
import CategoriesRepository from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';

let createCarUseCase: CreateCarUseCase;

let carsRepository: CarsRepository;

let categoriesRepository: CategoriesRepository;

describe('#CreateCar', () => {
  beforeAll(async () => {
    carsRepository = new CarsRepository();

    createCarUseCase = new CreateCarUseCase(carsRepository);

    categoriesRepository = new CategoriesRepository();
  });

  it('should be able to create a new car', async () => {
    const { id } = await categoriesRepository.create({
      name: 'categoryName',
      description: 'category description'
    });

    const data: ICreateCarDTO = {
      available: true,
      brand: 'brand',
      category_id: id,
      daily_rate: 62,
      description: 'some description for test',
      fine_amount: 12,
      license_plate: 'ABC-1234',
      name: 'CrossFox'
    };

    await createCarUseCase.execute(data);

    expect(
      carsRepository.findByLicensePlate(data.license_plate)
    ).resolves.toBeInstanceOf(Car);
  });

  it('should not be able to create a car with a license_plate that already exists', async () => {
    const { id } = await categoriesRepository.create({
      name: 'categoryName',
      description: 'category description'
    });

    const data: ICreateCarDTO = {
      available: true,
      brand: 'brand',
      category_id: id,
      daily_rate: 62,
      description: 'some description for test',
      fine_amount: 12,
      license_plate: 'ABC-1234',
      name: 'CrossFox'
    };

    await createCarUseCase.execute(data);

    expect(createCarUseCase.execute(data)).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a car with available true by default', async () => {
    const { id } = await categoriesRepository.create({
      name: 'categoryName',
      description: 'category description'
    });

    const data: ICreateCarDTO = {
      brand: 'brand',
      category_id: id,
      daily_rate: 60,
      description: 'some description for test',
      fine_amount: 12,
      license_plate: 'ABC-1234',
      name: 'CrossFox'
    };

    const car = await createCarUseCase.execute(data);

    expect(car.available).toBe(true);
  });
});
