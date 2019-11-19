import 'module-alias/register';
import models from '@models';
import * as jwt from '@utils/jwt';
import pipe from 'p-pipe';

export default function verifyAuthentication(request, response, next) {
  pipeline(request, response, next)
  .then(payload => {
    const { user } = payload;
    if (user) {
      request['user'] = user;
      next();
    } else {
      response.status(401);
      response.end();
    }
  })
  .catch(error => {
    console.error(error);
    response.status(401);
    response.end();
  });
}

async function pipeline(request, response, next) {
  try {
    const payload = await pipe(
      getToken,
      verifyToken,
      verifyUser,
    )({ request, response, next, token: null, userId: null, user: null, });
    return payload;
  } catch (error) {
    throw error;
  }
}

/**
 * 
 * @param {object} payload 
 * @returns {object} add the payload with the token.
 */
async function getToken(payload) {
  const { request, response } = payload;
  let scheme = null;
  let token = null;
  if (request.headers && request.headers.authorization) {
    const parts = request.headers.authorization.split(' ');
    if (parts.length === 2) {
      scheme = parts[0];
      token = parts[1];
    }
  }
  return {
    ...payload,
    token,
  };
}

async function verifyToken(payload) {
  try {
    const { token } = payload;
    let userId = null;
    if (token) {
      const decodedToken = await jwt.verify(token);
      userId = decodedToken.userId;
    }
    return {
      ...payload,
      userId,
    };
  } catch (error) {
    throw error;
  }
}

async function verifyUser(payload) {
  try {
    const { userId } = payload;
    let user = null;
    if (userId) {
      user = await models.users.findOne({ where: { id: userId } });
    }
    return {
      ...payload,
      user,
    };
  } catch (error) {
    throw error;
  }
}
