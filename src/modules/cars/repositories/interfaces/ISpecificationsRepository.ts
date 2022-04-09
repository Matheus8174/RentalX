import Specification from '../../entities/Specification';

export interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationDTO): Promise<void>;
  findByName(specificationName: string): Promise<Specification | undefined>;
}

export default ISpecificationsRepository;
