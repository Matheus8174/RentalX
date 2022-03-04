import Specification from '../model/Specification';

import ISpecificationsRepository, {
  ICreateSpecificationDTO
} from './interfaces/ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private readonly specifications: Specification[] = [];

  public create({ name, description }: ICreateSpecificationDTO) {
    const specification = new Specification(name, description, new Date());

    this.specifications.push(specification);
  }

  public findByName(specificationName: string) {
    const isThisSpecificationNameExists = this.specifications.find(
      (specification) => specification.name === specificationName
    );

    return isThisSpecificationNameExists;
  }
}

export default SpecificationsRepository;
