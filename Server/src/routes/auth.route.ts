import { Router } from 'express';
import verifyUserInfo from '../middleware/verifyUserInfo';
import { register } from '../controllers/auth.controller';

const router = Router();

router.post('/register' ,verifyUserInfo , register);

export default router;