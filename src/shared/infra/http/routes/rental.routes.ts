import { Router } from 'express';

import createRentalController from '@modules/rentals/usecases/createRental';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const rentalRoutes = Router();

rentalRoutes.post('/', ensureAuthenticated, createRentalController);

export default rentalRoutes;
