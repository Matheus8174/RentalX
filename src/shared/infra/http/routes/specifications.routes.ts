import { Router } from 'express';

import createSpecificationController from '@modules/cars/useCases/createSpecification';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ensureAdmin from '@shared/infra/http/middlewares/ensureAdmin';

const specificationsRoutes = Router();

specificationsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController
);

export default specificationsRoutes;
