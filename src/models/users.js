import 'module-alias/register';
import uuid from 'uuid';
import Sequelize from 'sequelize';
import sequelize from '@db/sequelize';
import services from '@services';

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

User.sync().then(async () => {
  const users = await User.findAll({});
  if (users.length === 0) {
    await services.users.create({ email: 'grover@gmail.com', password: '12345678' });
  }
  return users;
});

export default User;