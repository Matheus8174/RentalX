import ISpecificationsRepository from '../../repositories/interfaces/ISpecificationsRepository';

class CreateSpecificationUseCase {
  constructor(
    private readonly specificationsRepository: ISpecificationsRepository
  ) {}

  public execute(name: string, description: string) {
    const specificationAlreadyExists =
      this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists)
      throw new Error('specification already exists');

    this.specificationsRepository.create({ name, description });
  }
}

export default CreateSpecificationUseCase;
