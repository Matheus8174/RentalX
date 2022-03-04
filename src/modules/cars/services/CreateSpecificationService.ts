import ISpecificationsRepository from '../repositories/interfaces/ISpecificationsRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationService {
  constructor(
    private readonly specificationsRepository: ISpecificationsRepository
  ) {}

  public execute({ name, description }: IRequest) {
    const specificationAlreadyExists =
      this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists)
      throw new Error('specification already exists');

    this.specificationsRepository.create({ name, description });
  }
}

export default CreateSpecificationService;
