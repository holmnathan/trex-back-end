// Controllers: User (<HOSTNAME>/api/user) ------------------------------------

// Controllers ----------------------------------------------------------------
// GET ROUTE: "/test"
// Test Route is valid.
const test = (request, response) => {
  response.json({ message: 'Endpoint Valid: User' });
};

// GET ROUTE: "/test-authorized"
// Test Request Header for valid JSON Web Authentication Token.
const testAuthorized = (request, response) => {
  const { email } = request.user;
  response.json({ message: `Endpoint Valid: User Authenticated (${email})` });
};

// POST ROUTE: "/login"
// User Log In.
const login = (request, response) => {
  const { message } = request.authInfo;
  response.json({ ...request.user, message });
};

// POST ROUTE: "/register"
// User Registration.
const register = (request, response) => {
  const { message } = request.authInfo;
  response.json({ ...request.user, message });
};

export default {
  test,
  testAuthorized,
  login,
  register,
};
