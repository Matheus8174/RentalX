import ListCategoriesController from './ListCategoriesController';
import ListCategoriesUseCases from './ListCategoriesUseCases';
import CategoriesRepository from '../../repositories/CategoriesRepository';

const categoriesRepository = CategoriesRepository.getInstance();

const listCategoriesUseCases = new ListCategoriesUseCases(categoriesRepository);

const listCategoriesController = new ListCategoriesController(
  listCategoriesUseCases
);

export default listCategoriesController;
