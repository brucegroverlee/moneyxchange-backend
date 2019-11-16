import 'module-alias/register';
import uuid from 'uuid';
import Sequelize from 'sequelize';
import sequelize from '@db/sequelize';

const User = sequelize.define('user', {
  id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: uuid()
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, {
  // options
});

User.sync();

export default User;