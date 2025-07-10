import { Router } from 'express';
import verifyUserInfo from '../middleware/verifyUserInfo';
import CheckReusedEmailAndUsername from '../middleware/checkReusedEmailAndUsername';
import verifyPassStrength from '../middleware/verifyPasswordStrength';
import { register } from '../controllers/auth.controller';

const router = Router();

router.post('/register' ,verifyUserInfo, CheckReusedEmailAndUsername ,verifyPassStrength, register);

export default router;