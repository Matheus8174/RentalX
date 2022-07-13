import { Router } from 'express';

import Upload from '@config/upload';

import createCarController from '@modules/cars/useCases/createCar';
import listAvailableCarsController from '@modules/cars/useCases/listAvailableCars';
import createCarSpecificationController from '@modules/cars/useCases/createCarSpecification';
import uploadCarImagesController from '@modules/cars/useCases/uploadCarImage';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ensureAdmin from '../middlewares/ensureAdmin';
import uploadAvatar from '@config/upload/avatar';

const upload = new Upload(uploadAvatar, 'images', 'array').execute();

const carsRoutes = Router();

carsRoutes.post('/', ensureAuthenticated, ensureAdmin, createCarController);

carsRoutes.get('/available', listAvailableCarsController);

carsRoutes.post(
  '/specifications/:carId',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController
);

carsRoutes.post(
  '/images/:carId',
  ensureAuthenticated,
  ensureAdmin,
  upload,
  uploadCarImagesController
);

export default carsRoutes;
