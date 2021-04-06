// Controllers: User (<HOSTNAME>/api/trip) ------------------------------------

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

export default {
  test,
  testAuthorized,
};
