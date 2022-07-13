import ICreateCarDTO from '@modules/cars/dtos/ICreateCarDTO';
import CarsRepository from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import CategoriesRepository from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';

import ListAvailableCarsUseCase from './ListAvailableCarsUseCase';

let categoriesRepository: CategoriesRepository;

let carsRepository: CarsRepository;

let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe('#ListAvailableCars', () => {
  beforeAll(() => {
    carsRepository = new CarsRepository();

    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepository);

    categoriesRepository = new CategoriesRepository();
  });

  it('should list a car with availeble true', async () => {
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

    await carsRepository.create(data);

    const response = await listAvailableCarsUseCase.execute({
      category_id: data.category_id
    });

    expect(response).toHaveLength(1);

    expect(response).toEqual(
      expect.arrayContaining([expect.objectContaining(data)])
    );
  });

  it('should not list a car with avaible false', async () => {
    const { id } = await categoriesRepository.create({
      name: 'categoryName',
      description: 'category description'
    });

    const data: ICreateCarDTO = {
      available: false,
      brand: 'brand',
      category_id: id,
      daily_rate: 62,
      description: 'some description for test',
      fine_amount: 12,
      license_plate: 'ABC-1234',
      name: 'CrossFox'
    };

    await carsRepository.create(data);

    const response = await listAvailableCarsUseCase.execute({
      brand: data.brand
    });

    expect(response).toHaveLength(0);

    expect(response).toEqual(expect.arrayContaining([]));
  });

  it.skip('should be able to list all available cars by name', async () => {
    const { id } = await categoriesRepository.create({
      name: 'categoryName',
      description: 'category description'
    });

    const data: ICreateCarDTO = {
      available: false,
      brand: 'brand',
      category_id: id,
      daily_rate: 62,
      description: 'some description for test',
      fine_amount: 12,
      license_plate: 'ABC-1234',
      name: 'CrossFox'
    };

    await carsRepository.create(data);

    const response = await listAvailableCarsUseCase.execute({
      name: data.name,
      brand: data.brand,
      category_id: data.category_id
    });

    expect(response).toHaveLength(1);

    expect(response).toEqual(
      expect.arrayContaining([expect.objectContaining(data)])
    );
  });
});
