import { Router } from 'express';
import verifyUserInfo from '../middleware/verifyUserInfo';
import CheckReusedEmailAndUsername from '../middleware/checkReusedEmailAndUsername';
import verifyPassStrength from '../middleware/verifyPasswordStrength';
import userVerification from '../middleware/UserVerification';
import { register, login, logout, updateProfile, updatePassword } from '../controllers/auth.controller';

const router = Router();

router.post('/register' ,verifyUserInfo, CheckReusedEmailAndUsername ,verifyPassStrength, register);

router.post('/login', login);

router.post('/logout', logout);

router.put('/profile', userVerification, updateProfile);

router.put('/password', userVerification, updatePassword);

export default router;