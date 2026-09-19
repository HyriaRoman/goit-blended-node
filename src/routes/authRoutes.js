import { Router } from 'express';
import { celebrate } from 'celebrate';
import { loginSchema, registerSchema } from '../validation/authValidation.js';
import {
  login,
  logout,
  refreshToken,
  register,
} from '../controllers/authController.js';

const router = Router();

router.post('/auth/register', celebrate(registerSchema), register);
router.post('/auth/login', celebrate(loginSchema), login);
router.post('/auth/logout', logout);
router.post('/auth/refresh', refreshToken);

export default router;
