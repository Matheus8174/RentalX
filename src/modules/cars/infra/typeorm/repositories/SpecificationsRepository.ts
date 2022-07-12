import { getRepository, Repository } from 'typeorm';

import Specification from '../entities/Specification';

import ISpecificationsRepository, {
  ICreateSpecificationDTO
} from '../../../repositories/interfaces/ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO) {
    const newSpecification = this.repository.create({
      name,
      description
    });

    return await this.repository.save(newSpecification);
  }

  async findByName(specificationName: string) {
    const specificationFinded = await this.repository.findOne({
      where: { name: specificationName }
    });

    return specificationFinded;
  }

  async findByIds(ids: string[]) {
    const specifications = await this.repository.findByIds(ids);

    return specifications;
  }
}

export default SpecificationsRepository;
