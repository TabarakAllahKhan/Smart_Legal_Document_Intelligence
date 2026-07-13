import {Router} from 'express';
import {register,LoginUser} from './auth.controller';

const router=Router();

router.post('/register',register);
router.post('/login',LoginUser);

export default router;