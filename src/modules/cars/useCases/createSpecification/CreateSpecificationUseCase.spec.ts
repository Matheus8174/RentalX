import CreateSpecificationUseCase from './CreateSpecificationUseCase';
import SpecificationsRepository from '../../repositories/SpecificationsRepository';
import AppError from '@errors/AppError';

let createSpecificationUseCase: CreateSpecificationUseCase;

let specificationsRepository: SpecificationsRepository;

describe('#CreateSpecification', () => {
  beforeAll(() => {
    specificationsRepository = new SpecificationsRepository();

    createSpecificationUseCase = new CreateSpecificationUseCase(
      specificationsRepository
    );
  });

  it('should be able to create a new Specification', async () => {
    const data = {
      name: 'test',
      description: 'test'
    };

    await createSpecificationUseCase.execute(data);

    const response = await specificationsRepository.findByName(data.name);

    expect(response).toEqual(expect.objectContaining(data));
  });

  it('should not be able to create a new specification that already exists', async () => {
    const data = {
      name: 'test',
      description: 'test'
    };

    await createSpecificationUseCase.execute(data);

    expect(createSpecificationUseCase.execute(data)).rejects.toBeInstanceOf(
      AppError
    );
  });
});
