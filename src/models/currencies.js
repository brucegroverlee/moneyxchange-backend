import 'module-alias/register';
import Sequelize from 'sequelize';
import sequelize from '@db/sequelize';

const Currency = sequelize.define('currencie', {
  object: {
    type: Sequelize.STRING,
    defaultValue: 'currency',
  },
  code: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  symbol: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isBase: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
}, {
  // options
});

Currency.sync();

export default Currency;