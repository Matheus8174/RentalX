import CreateCategoryController from './CreateCategoryController';
import CreateCategoryUseCase from './CreateCategoryUseCase';
import CategoriesRepository from '../../repositories/CategoriesRepository';

const categoriesRepository = CategoriesRepository.getInstance();

const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);

const createCategoryController = new CreateCategoryController(
  createCategoryUseCase
);

createCategoryController.execute = createCategoryController.execute.bind(
  createCategoryController
);

export default createCategoryController;
