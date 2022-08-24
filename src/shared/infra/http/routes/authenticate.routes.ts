import { Router } from 'express';

import authenticateUserController from '@modules/accounts/useCases/authenticateUser';
import refreshTokenController from '@modules/accounts/useCases/refreshToken';

const authenticateRoutes = Router();

authenticateRoutes.post('/', authenticateUserController);
authenticateRoutes.post('/refresh-token', refreshTokenController);

export default authenticateRoutes;
