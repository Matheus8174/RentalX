import { Router } from 'express';

import sendForgotPasswordMailController from '@modules/accounts/useCases/sendForgotPasswordMail';
import resetPasswordUserController from '@modules/accounts/useCases/resetPasswordUser';

const passwordRoutes = Router();

passwordRoutes.post('/forgot', sendForgotPasswordMailController);
passwordRoutes.post('/reset', resetPasswordUserController);

export default passwordRoutes;
