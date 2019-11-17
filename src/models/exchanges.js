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

Exchange.sync();

export default Exchange;