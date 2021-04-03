import user from './user.mjs';

const index = (request, response) => {
  response.json({ name: 'Trex API Server', author: 'Nathan Holm' });
};

export default {
  index,
  user,
};
