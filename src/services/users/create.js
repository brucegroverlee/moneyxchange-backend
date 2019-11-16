import 'module-alias/register';
import models from '@models';
import bcrypt from 'bcryptjs';

/**
 * @param {object} payload
 * @property {string} payload.email 
 * @property {string} payload.password 
 * @returns {Promise<object>} returns the user object. Otherwise, returns null
 */
export default async function create(payload) {
  try {
    const saltRounds = 10;
    const password = await bcrypt.hash(payload.password, saltRounds);
    const user = await models.users.create({ email: payload.email, password: password });
    return user;
  } catch (error) {
    throw error;
  }
}