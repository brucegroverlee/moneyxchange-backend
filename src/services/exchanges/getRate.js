import 'module-alias/register';
import models from '@models';

/**
 * @returns {Promise<number>} returns the rate.
 */
export default async function getRate(pair) {
  try {
    if (pair && typeof pair === 'string' && pair.length > 0) {
      const pairUpperCase = pair.toUpperCase();
      const exchange = await models.exchanges.findOne({ where: { pair: pairUpperCase }});
      if (exchange) {
        exchange.rate = Math.random();
        return exchange;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}