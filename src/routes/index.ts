import { Router } from 'express';

import categoriesRoutes from './categories.routes';
import specificationsRoutes from './specifications.routes';

const routes = Router();

const prefixRoutes = '/api/v1';

routes.use(`${prefixRoutes}/categories`, categoriesRoutes);
routes.use(`${prefixRoutes}/specifications`, specificationsRoutes);

export default routes;
