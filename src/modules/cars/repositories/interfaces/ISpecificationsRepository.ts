import Specification from '@modules/cars/infra/typeorm/entities/Specification';

export interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({
    name,
    description
  }: ICreateSpecificationDTO): Promise<Specification>;
  findByName(specificationName: string): Promise<Specification | undefined>;
  findByIds(ids: string[]): Promise<Specification[]>;
}

export default ISpecificationsRepository;
