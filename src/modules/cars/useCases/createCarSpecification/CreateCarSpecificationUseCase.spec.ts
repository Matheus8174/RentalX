import CreateCarSpecificationUseCase from './CreateCarSpecificationUseCase';
import CarsRepository from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import AppError from '@shared/errors/AppError';
import ICreateCarDTO from '@modules/cars/dtos/ICreateCarDTO';
import SpecificationsRepository from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import CategoriesRepository from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';

let categoriesRepository: CategoriesRepository;

let carsRepository: CarsRepository;

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

let specificationsRepository: SpecificationsRepository;

describe('#CreateCarSpecification', () => {
  beforeAll(() => {
    categoriesRepository = new CategoriesRepository();

    specificationsRepository = new SpecificationsRepository();

    carsRepository = new CarsRepository();

    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepository,
      specificationsRepository
    );
  });

  it('should not be able to add a new specification to a car that not exists', async () => {
    const carId = '12345';
    const specificationId = ['54321'];

    expect(
      createCarSpecificationUseCase.execute({
        carId,
        specificationId
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it.skip('should be able to add a new specification to a car', async () => {
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

    const car = await carsRepository.create(data);

    const specification = await specificationsRepository.create({
      name: 'test',
      description: 'specificationTest'
    });

    const response = await createCarSpecificationUseCase.execute({
      carId: car.id,
      specificationId: [specification.id]
    });

    expect(response).toHaveProperty('specifications', [specification]);
    expect(response.specifications).toHaveLength(1);
  });
});
