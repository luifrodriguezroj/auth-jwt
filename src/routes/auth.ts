import { Router } from 'express';
import { signUp, signIn, profile } from '../controllers/authController'
import { verifyToken } from '../middlewares/verifyToken'

const router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/profile', verifyToken, profile)

export default router;