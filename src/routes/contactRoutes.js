import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { createContact,listContacts,updateContact } from '../controllers/contactController.js';
import { requireAdmin } from '../middleware/adminAuth.js';

const router=Router();
const contactLimiter=rateLimit({windowMs:15*60*1000,limit:5,standardHeaders:'draft-8',legacyHeaders:false,
  message:{success:false,message:'Too many contact requests. Try again later.'}});
router.post('/',contactLimiter,createContact);
router.get('/',requireAdmin,listContacts);
router.patch('/:id',requireAdmin,updateContact);
export default router;
