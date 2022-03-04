import { Router } from 'express';

import createCategoryController from '../modules/cars/useCases/createCategory';
import listCategoriesController from '../modules/cars/useCases/listCategories';

const categoriesRoutes = Router();

categoriesRoutes.post('/', createCategoryController.execute);

categoriesRoutes.get('/', listCategoriesController.execute);

export default categoriesRoutes;
