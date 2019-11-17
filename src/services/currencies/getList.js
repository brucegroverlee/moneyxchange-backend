import 'module-alias/register';
import models from '@models';

/**
 * @returns {Promise<Array>} returns the list of currencies.
 */
export default async function getList() {
  try {
    const currencies = await models.currencies.findAll({});
    return currencies;
  } catch (error) {
    throw error;
  }
}