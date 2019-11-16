import express from 'express';
import bodyParser from 'body-parser';

import usersRouter from './users/router';

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.text());
router.use(bodyParser.json({type: 'application/json'}));

router.use(usersRouter);

export default router;