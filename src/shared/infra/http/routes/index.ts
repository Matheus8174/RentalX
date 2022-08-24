import { Router } from 'express';

import carsRoutes from './cars.routes';
import categoriesRoutes from './categories.routes';
import specificationsRoutes from './specifications.routes';
import usersRoutes from './users.routes';
import authenticateRoutes from './authenticate.routes';
import rentalRoutes from './rental.routes';
import passwordRoutes from './password.routes';

const routes = Router();

const prefixRoutes = '/api/v1';

routes.use(`${prefixRoutes}/categories`, categoriesRoutes);
routes.use(`${prefixRoutes}/specifications`, specificationsRoutes);
routes.use(`${prefixRoutes}/users`, usersRoutes);
routes.use(`${prefixRoutes}/session`, authenticateRoutes);
routes.use(`${prefixRoutes}/cars`, carsRoutes);
routes.use(`${prefixRoutes}/rentals`, rentalRoutes);
routes.use(`${prefixRoutes}/password`, passwordRoutes);

export default routes;
