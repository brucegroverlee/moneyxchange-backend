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

chai.use(chaiHttp);

describe('Login test suit', () => {
  let requester;

  beforeAll( async done => {
    requester = chai.request(server).keepOpen();
    const user = await models.users.findOne({ where: { email: 'grover@gmail.com' } });
    if (!user) {
      await services.users.create({ email: 'grover@gmail.com', password: '12345678' });
    }
    done();
  });

  afterAll(done => {
    requester.close(done);
  });

  describe('POST /login', () => {
    test('It should returns the token session.', async (done) => {
      const res = await requester
      .post('/login').send({
        email: "grover@gmail.com",
        password: "12345678",
      });
      expect(res.status).toEqual(202);
      expect(typeof res.body.token).toEqual('string');
      done();
    });

    test('It shouldn\'t returns the token session.', async (done) => {
      const res = await requester
      .post('/login').send({
        email: "grover@gmail.com",
        password: "12345679",
      });
      expect(res.status).toEqual(400);
      done();
    });

    test('It shouldn\'t returns the token session. there isn\'t password attribute.', async (done) => {
      const res = await requester
      .post('/login').send({
        email: "grover@gmail.com",
      });
      expect(res.status).toEqual(400);
      done();
    });

    test('It shouldn\'t returns the token session. there isn\'t email attribute.', async (done) => {
      const res = await requester
      .post('/login').send({
        password: "12345679",
      });
      expect(res.status).toEqual(400);
      done();
    });
  });

});