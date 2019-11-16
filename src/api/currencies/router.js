import express from 'express';
const router = express.Router();

import getCurrenciesListController from './controllers/getCurrenciesListController';
import verifyAuthentication from '../../middlewares/verifyAuthentication';

router.get('/currencies', verifyAuthentication, getCurrenciesListController);

export default router;