import { Router } from 'express';
import verifyUserInfo from '../middleware/verifyUserInfo';
import CheckReusedEmailAndUsername from '../middleware/checkReusedEmailAndUsername';
import verifyPassStrength from '../middleware/verifyPasswordStrength';
import { register, login, logout } from '../controllers/auth.controller';

const router = Router();

router.post('/register' ,verifyUserInfo, CheckReusedEmailAndUsername ,verifyPassStrength, register);

router.post('/login', login);

router.post('/logout', logout);

export default router;