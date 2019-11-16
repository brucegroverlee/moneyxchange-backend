import 'module-alias/register';
import models from '@models';
import bcrypt from 'bcryptjs';
import * as jwt from '@utils/jwt';
import pipe from 'p-pipe';

/**
 * @param {object} payload
 * @property {string} payload.email 
 * @property {string} payload.password 
 * @returns {Promise<string>} returns the token. Otherwise, returns null
 */
export default async function login(payload) {
  try {
    const result = await pipe(
      getUser,
      verifyPassword,
      createToken,
    )(payload);
    return result;
  } catch (error) {
    throw error;
  }
}


/**
 * 
 * @param {object} payload 
 * @returns {Promise<object>} returns the payload with the user object.
 */
async function getUser(payload) {
  const { email } = payload;
  try {
    const user = await models.users.findOne({ where: { email }});
    return {
      ...payload,
      user,
    };
  } catch (error) {
    throw error;
  }
}

/**
 * 
 * @param {object} user 
 * @returns {Promise<string>} if the password is valid, returns the user's id. Otherwise, retuns false.
 */
async function verifyPassword(payload) {
  try {
    if (payload.user) {
      const isValid = await bcrypt.compare(payload.password, payload.user.password);
      if (isValid) {
        return payload.user.id;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}

/**
 * 
 * @param {string} userId 
 * @returns {Promise<string>} if it is valid, returns the token. Otherwise, retuns null.
 */
async function createToken(userId) {
  if (userId) {
    const token = jwt.createToken(userId /** userId */);
    return token;
  } else {
    return null;
  }
}
