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

describe('Get Currencies list test suit', () => {
  let requester;
  let user;

  beforeAll( async done => {
    requester = chai.request(server).keepOpen();
    user = await models.users.findOne({ where: { email: 'grover@gmail.com' } });
    if (!user) {
      user = await services.users.create({ email: 'grover@gmail.com', password: '12345678' });
    }
    const currency = await models.currencies.findOne({ where: { code: 'USD' } });
    if (!currency) {
      await models.currencies.create({ code: 'USD', symbol: '$', isBase: true, });
    }
    done();
  });

  afterAll(done => {
    requester.close(done);
  });

  describe('GET /currencies', () => {
    test('It should returns the currencies\' list.', async (done) => {
      const token = jwt.createToken(user.id);
      const res = await requester
      .get('/currencies')
      .set('Authorization', `Bearer ${token}`)
      expect(res.status).toEqual(200);
      const currency = res.body.find((elem) => {
        return elem.code === 'USD';
      });
      expect(typeof res.body).toEqual('object');
      expect(typeof currency).toEqual('object');
      expect(currency.object).toEqual('currency');
      expect(currency.code).toEqual('USD');
      expect(currency.symbol).toEqual('$');
      expect(currency.isBase).toEqual(true);
      done();
    });

    test('It shouldn\'t returns the currencies\' list. The token is invalid.', async (done) => {
      const token = jwt.createToken('1234567890');
      const res = await requester
      .get('/currencies')
      .set('Authorization', `Bearer ${token}`)
      expect(res.status).toEqual(401);
      done();
    });

    test('It shouldn\'t returns the currencies\' list. The token is invalid.', async (done) => {
      const res = await requester
      .get('/currencies')
      .set('Authorization', `Bearer`)
      expect(res.status).toEqual(401);
      done();
    });

    test('It shouldn\'t returns the currencies\' list. The token is invalid.', async (done) => {
      const res = await requester
      .get('/currencies')
      expect(res.status).toEqual(401);
      done();
    });

  });

});