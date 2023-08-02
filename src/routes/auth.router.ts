import { Router } from 'express';
import { signup, login } from '../controllers/auth.controller.js';

const router = Router();

router.post('/signup', signup as any);
router.post('/login', login as any);

export default router;
