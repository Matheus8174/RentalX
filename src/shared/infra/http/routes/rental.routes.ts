import { Router } from 'express';

import createRentalController from '@modules/rentals/usecases/createRental';
import devolutionRental from '@modules/rentals/usecases/devolutionRental';
import listRentalsByUser from '@modules/rentals/usecases/listRentalsByUser';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const rentalRoutes = Router();

rentalRoutes.post('/', ensureAuthenticated, createRentalController);
rentalRoutes.post('/devolution/:id', ensureAuthenticated, devolutionRental);
rentalRoutes.get('/user', ensureAuthenticated, listRentalsByUser);

export default rentalRoutes;
