import 'module-alias/register';

import users from '@services/users';

export default function loginController(request, response) {
  const { email, password } = request.body;
  users.login({ email, password })
  .then(token => {
    if (token) {
      response.status(202);
      response.send({
        token,
      });
    } else {
      response.status(400);
      response.end();
    }
  })
  .catch(error => {
    console.error(error);
    response.status(500);
    response.end();
  })
}
