const index = (request, response) => {
  response.json('User');
};

const login = (request, response) => {
  response.json(request.user);
};

const test = (request, response) => {
  response.json({ message: 'Endpoint Valid: User' });
};

export default {
  index,
  login,
  test,
};
