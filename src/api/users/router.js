import express from 'express';
const router = express.Router();

import loginController from './controllers/loginController';
import verifyCredential from '../../middlewares/verifyCredential';

router.post('/login', verifyCredential, loginController);

export default router;