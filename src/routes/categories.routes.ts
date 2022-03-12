import multer, { memoryStorage } from 'multer';
import { Router } from 'express';

import createCategoryController from '../modules/cars/useCases/createCategory';
import listCategoriesController from '../modules/cars/useCases/listCategories';
import importCategoryController from '../modules/cars/useCases/importCategory';

const categoriesRoutes = Router();

const upload = multer({
  fileFilter: (request, file, callback) => {
    const [extension, ,] = file.originalname.split('.').reverse();

    if (extension !== 'csv') callback(new Error('Just csv files are allowed'));

    callback(null, true);
  },
  storage: memoryStorage(),
  dest: './tmp'
});

categoriesRoutes.post('/', createCategoryController.execute);

categoriesRoutes.get('/', listCategoriesController.execute);

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  importCategoryController.execute
);

export default categoriesRoutes;
