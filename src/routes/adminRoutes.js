import { Router } from 'express';
import { login, logout, bootstrapAdmin } from '../controllers/adminController.js';
import { requireAdmin } from '../middleware/adminAuth.js';

const router=Router();
router.post('/login',login);
router.post('/logout',requireAdmin,logout);
router.post('/bootstrap',bootstrapAdmin);
export default router;
