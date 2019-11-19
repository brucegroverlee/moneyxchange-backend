import express from 'express';
const router = express.Router();

import getExchangeController from './controllers/getExchangeController';
import getExchangesListController from './controllers/getExchangesListController';
import verifyAuthentication from '../../middlewares/verifyAuthentication';

router.get('/exchanges/:pair', verifyAuthentication, getExchangeController);
router.get('/exchanges', verifyAuthentication, getExchangesListController);

export default router;