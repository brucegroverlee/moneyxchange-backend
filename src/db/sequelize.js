/**
 * @module db/sequelize
 * @author Bruce Grover Lee
 */
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ 
  path: path.resolve(process.cwd(), 'env', process.env.ENV_FILE) 
});

import Sequelize from 'sequelize';

const sequelize = new Sequelize(process.env.DB_DB, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  logging: false,
});

export default sequelize;