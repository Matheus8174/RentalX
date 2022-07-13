import { Router } from 'express';

import Upload from '@config/upload';
import uploadAvatar from '@config/upload/avatar';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import createUserController from '@modules/accounts/useCases/createUser';
import updateUserAvatarController from '@modules/accounts/useCases/updateUserAvatar';

const upload = new Upload(uploadAvatar, 'avatar', 'single').execute();

const usersRoutes = Router();

usersRoutes.post('/', createUserController);

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload,
  updateUserAvatarController
);

export default usersRoutes;
