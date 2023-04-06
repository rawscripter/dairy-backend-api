import { Router } from 'express';

import { register, login } from './user.controller';
import { validateRequest } from '../../utilities/ValidateRequest';
import { User } from './user.model';
const router = Router();

router.post(
  '/register',
  validateRequest({
    body: User,
  }),
  register,
);

router.post('/login',
  validateRequest({
    body: User,
  }),
  login
);

export default router;
