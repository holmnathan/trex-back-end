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
  response.json({ message: 'Endpoint Valid: User (Authenticated)' });
};

// POST ROUTE: "/login"
// User Log In.
const login = (request, response) => {
  const { email, fullName, _id } = request.user;
  response.json({ _id, email, fullName, message: 'User Log In Successful' });
};

// POST ROUTE: "/register"
// User Registration.
const register = (request, response) => {
  const { email, displayName, fullName, _id } = request.user;
  response.json({
    _id,
    email,
    fullName,
    displayName,
    message: 'User Registration Successful',
  });
};

export default {
  test,
  testAuthorized,
  login,
  register,
};
