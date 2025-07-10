import { Router } from 'express';
import verifyUserInfo from '../middleware/verifyUserInfo';
import verifyPassStrength from '../middleware/verifyPasswordStrength';
import { register } from '../controllers/auth.controller';

const router = Router();

router.post('/register' ,verifyUserInfo, verifyPassStrength, register);

export default router;