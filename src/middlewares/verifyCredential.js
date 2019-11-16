export default function verifyCredential(request, response, next) {
  const { email, password } = request.body;
  if (
    email && typeof email === 'string' && email !== ''
    && password && typeof password === 'string' && password !== '') {
    next()
  } else {
    response.status(400).end();
  }
}
