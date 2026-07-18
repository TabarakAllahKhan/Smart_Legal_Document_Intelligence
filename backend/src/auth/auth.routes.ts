import {Router} from 'express';
import {register,LoginUser,refresh,logout} from './auth.controller';
import { requireAuth } from '../middlewares/auth.middleware';

const router=Router();

router.post('/register',register);
router.post('/login',LoginUser);
router.post("/refresh",refresh);
router.post("/logout",requireAuth,logout);

export default router;