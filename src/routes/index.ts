import { Router } from 'express';

import categoriesRoutes from './categories.routes';
import specificationsRoutes from './specifications.routes';
import usersRoutes from './users.routes';
import authenticateRoutes from './authenticate.routes';

const routes = Router();

const prefixRoutes = '/api/v1';

routes.use(`${prefixRoutes}/categories`, categoriesRoutes);
routes.use(`${prefixRoutes}/specifications`, specificationsRoutes);
routes.use(`${prefixRoutes}/users`, usersRoutes);
routes.use(`${prefixRoutes}/session`, authenticateRoutes);

export default routes;
