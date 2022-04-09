import { Router } from 'express';

import Upload from '@config/upload';
import uploadCategories from '@config/upload/categories';

import createCategoryController from '@modules/cars/useCases/createCategory';
import listCategoriesController from '@modules/cars/useCases/listCategories';
import importCategoryController from '@modules/cars/useCases/importCategory';

const upload = new Upload(uploadCategories, 'file').execute();

const categoriesRoutes = Router();

categoriesRoutes.post('/', createCategoryController);

categoriesRoutes.get('/', listCategoriesController);

categoriesRoutes.post('/import', upload, importCategoryController);

export default categoriesRoutes;
