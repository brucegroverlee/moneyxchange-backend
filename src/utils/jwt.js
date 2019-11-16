import path from 'path';
import dotenv from'dotenv';
dotenv.config({ 
  path: path.resolve(process.cwd(), 'env', process.env.ENV_FILE) 
});

import jwt from'jsonwebtoken';

/**
 * @description create a JWT access token
 * @param {string} userId 
 */
export function createToken(userId) {
  const token = jwt.sign({ 
    userId,
  }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
  return token;
}

export function verify(token) {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return decodedToken;
  } catch(err) {
    console.error(err);
    throw err;
  }
}