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

Currency.sync().then(async () => {
  const currencies = await Currency.findAll({});
  debugger
  if (currencies.length === 0) {
    await Currency.bulkCreate([
      { code: 'USD', symbol: '$', isBase: true, },
      { code: 'EUR', symbol: '\u20AC', },
    ]);
  }
  return currencies;
});

export default Currency;