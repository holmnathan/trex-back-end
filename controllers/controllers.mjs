// Controllers: API (<HOSTNAME>/api/) -----------------------------------------

// Sub-Controllers ------------------------------------------------------------
import user from './user.mjs'; // User Controller

// Controllers ----------------------------------------------------------------
// GET ROUTE: "/"
// Return basic App information.
const api = (request, response) => {
  response.json({ name: 'Trex API Server', author: 'Nathan Holm' });
};

export default {
  api,
  user,
};
