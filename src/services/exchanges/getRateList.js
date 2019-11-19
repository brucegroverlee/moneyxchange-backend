import 'module-alias/register';
import models from '@models';

/**
 * @returns {Promise<Array>} returns the rate list.
 */
export default async function getRateList() {
  try {
    const exchangetmp = await models.exchanges.findAll({});
    const exchanges = exchangetmp.map((elem) => {
      elem.rate = Math.random();
      return elem;
    });
    return exchanges;
  } catch (error) {
    throw error;
  }
}