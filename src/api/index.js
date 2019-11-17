import express from 'express';
import bodyParser from 'body-parser';

import usersRouter from './users/router';
import currenciesRouter from './currencies/router';

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.text());
router.use(bodyParser.json({type: 'application/json'}));

router.use(usersRouter);
router.use(currenciesRouter);

router.use((request, response) => { 
  response.status(404);
  response.end();
});

export default router;