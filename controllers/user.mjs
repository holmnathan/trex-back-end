// Imports
// ----------------------------------------------------------------------------

// User Controllers
// ----------------------------------------------------------------------------

// GET ROUTE: /user/test
// Test that User Route is valid
const test = (request, response) => {
  response.json({ message: 'Endpoint Valid: User' });
};

// GET ROUTE: /user/test-authorized
// Test if a valid JSON Web Authentication Token is submitted in request header
const testAuthorized = (request, response) => {
  response.json({ message: 'Endpoint Valid: User (Authenticated)' });
};

// POST ROUTE: /user/login
// User Log In
const login = (request, response) => {
  const { email, full_name, _id } = request.user;
  response.json({ _id, email, full_name, message: 'User Log In Successful' });
};

// POST ROUTE: /user/register
// User Registration
const register = (request, response) => {
  const { email, display_name, full_name, _id } = request.user;
  response.json({
    _id,
    email,
    full_name,
    display_name,
    message: 'User Registration Successful',
  });
};

export default {
  test,
  testAuthorized,
  login,
  register,
};
