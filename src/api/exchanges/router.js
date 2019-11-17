import express from 'express';
const router = express.Router();

import getExchangeController from './controllers/getExchangeController';
import verifyAuthentication from '../../middlewares/verifyAuthentication';

router.get('/exchanges/:pair', verifyAuthentication, getExchangeController);

export default router;