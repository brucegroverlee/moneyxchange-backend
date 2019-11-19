import 'module-alias/register';
import Sequelize from 'sequelize';
import sequelize from '@db/sequelize';

const Exchange = sequelize.define('exchange', {
  object: {
    type: Sequelize.STRING,
    defaultValue: 'exchange',
  },
  pair: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  // options
});

Exchange.sync().then(async () => {
  const exchanges = await Exchange.findAll({});
  if (exchanges.length === 0) {
    await Exchange.create({
      pair: 'USDEUR',
    });
  }
  return exchanges;
});

export default Exchange;