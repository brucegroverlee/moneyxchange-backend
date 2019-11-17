import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ 
  path: path.resolve(process.cwd(), 'env', process.env.ENV_FILE) 
});

import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '@server';
import models from '@models';
import services from '@services';
import * as jwt from '@utils/jwt';

chai.use(chaiHttp);

describe('Get Exchange test suit', () => {
  let requester;
  let user;

  beforeAll( async done => {
    requester = chai.request(server).keepOpen();
    user = await models.users.findOne({ where: { email: 'grover@gmail.com' } });
    if (!user) {
      user = await services.users.create({ email: 'grover@gmail.com', password: '12345678' });
    }
    const exchange = await models.exchanges.findOne({ where: { pair: 'USDEUR' } });
    if (!exchange) {
      await models.exchanges.create({ pair: 'USDEUR', });
    }
    done();
  });

  afterAll(done => {
    requester.close(done);
  });

  describe('GET /exchanges/{pair}', () => {
    test('It should returns the exchange rate.', async (done) => {
      const token = jwt.createToken(user.id);
      const res = await requester
      .get('/exchanges/usdeur')
      .set('Authorization', `Bearer ${token}`)
      expect(res.status).toEqual(200);
      expect(typeof res.body).toEqual('object');
      expect(res.body.object).toEqual('exchange');
      expect(res.body.pair).toEqual('USDEUR');
      done();
    });

    test('It shouldn\'t returns the exchange rate. The exchange is invalid.', async (done) => {
      const token = jwt.createToken(user.id);
      const res = await requester
      .get('/exchanges/usdchf')
      .set('Authorization', `Bearer ${token}`)
      expect(res.status).toEqual(404);
      done();
    });

    test('It shouldn\'t returns the exchange rate. The token is invalid.', async (done) => {
      const token = jwt.createToken('1234567890');
      const res = await requester
      .get('/exchanges/usdeur')
      .set('Authorization', `Bearer ${token}`)
      expect(res.status).toEqual(401);
      done();
    });

    test('It shouldn\'t returns the exchange rate. The token is invalid.', async (done) => {
      const res = await requester
      .get('/exchanges/usdeur')
      .set('Authorization', `Bearer`)
      expect(res.status).toEqual(401);
      done();
    });

    test('It shouldn\'t returns the exchange rate. The token is invalid.', async (done) => {
      const res = await requester
      .get('/exchanges/usdeur')
      expect(res.status).toEqual(401);
      done();
    });

  });

});