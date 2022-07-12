import { Router } from 'express';

import Upload from '@config/upload';
import uploadCategories from '@config/upload/categories';

import createCategoryController from '@modules/cars/useCases/createCategory';
import listCategoriesController from '@modules/cars/useCases/listCategories';
import importCategoryController from '@modules/cars/useCases/importCategory';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ensureAdmin from '../middlewares/ensureAdmin';

const upload = new Upload(uploadCategories, 'file', 'single').execute();

const categoriesRoutes = Router();

categoriesRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController
);

categoriesRoutes.get('/', ensureAuthenticated, listCategoriesController);

categoriesRoutes.post(
  '/import',
  ensureAuthenticated,
  ensureAdmin,
  upload,
  importCategoryController
);

export default categoriesRoutes;
