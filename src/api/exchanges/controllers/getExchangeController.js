import 'module-alias/register';

import exchanges from '@services/exchanges';

export default function getExchangesController(request, response) {
  exchanges.getRate(request.params.pair)
  .then(rate => {
    if (rate) {
      response.status(200);
      response.send(rate);
    } else {
      response.status(404);
      response.end();
    }
  })
  .catch(error => {
    console.error(error);
    response.status(500);
    response.end();
  });
}