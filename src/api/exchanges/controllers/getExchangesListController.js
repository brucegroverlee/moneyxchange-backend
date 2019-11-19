import 'module-alias/register';

import exchanges from '@services/exchanges';

export default function getExchangesListController(request, response) {
  exchanges.getRateList()
  .then(rates => {
    response.status(200);
    response.send(rates);
  })
  .catch(error => {
    console.error(error);
    response.status(500);
    response.end();
  });
}