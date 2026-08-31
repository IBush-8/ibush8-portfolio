import { Router } from 'express';
import { getProject,listProjects,createProject,updateProject,deleteProject } from '../controllers/projectController.js';
import { requireAdmin } from '../middleware/adminAuth.js';

const router=Router();
router.get('/',listProjects);
router.get('/:id',getProject);
router.post('/',requireAdmin,createProject);
router.patch('/:id',requireAdmin,updateProject);
router.delete('/:id',requireAdmin,deleteProject);
export default router;
