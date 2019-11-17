import 'module-alias/register';

import currencies from '@services/currencies';

export default function getCurrenciesListController(request, response) {
  currencies.getList()
  .then(list => {
    response.status(200);
    response.send(list);
  })
  .catch(error => {
    console.error(error);
    response.status(500);
    response.end();
  });
}