import { getRepository, Repository } from 'typeorm';

import Specification from '../entities/Specification';

import ISpecificationsRepository, {
  ICreateSpecificationDTO
} from './interfaces/ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  public async create({ name, description }: ICreateSpecificationDTO) {
    const newSpecification = this.repository.create({
      name,
      description
    });

    await this.repository.save(newSpecification);
  }

  public async findByName(specificationName: string) {
    const specificationFinded = await this.repository.findOne({
      where: { name: specificationName }
    });

    return specificationFinded;
  }
}

export default SpecificationsRepository;
