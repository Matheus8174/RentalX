import CreateSpecificationController from './CreateSpecificationController';
import CreateSpecificationUseCase from './CreateSpecificationUseCase';
import SpecificationsRepository from '../../repositories/SpecificationsRepository';

const specificationsRepository = new SpecificationsRepository();

const createSpecificationUseCase = new CreateSpecificationUseCase(
  specificationsRepository
);

const createSpecificationController = new CreateSpecificationController(
  createSpecificationUseCase
);

createSpecificationController.execute =
  createSpecificationController.execute.bind(createSpecificationController);

export default createSpecificationController;
