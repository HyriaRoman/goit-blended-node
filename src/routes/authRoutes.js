import { Router } from 'express';
import { celebrate } from 'celebrate';
import { registerSchema } from '../validation/authValidation.js';
import { register } from '../controllers/authController.js';

const router = Router();

router.post('/auth/register', celebrate(registerSchema), register);

export default router;
