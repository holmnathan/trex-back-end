// JSON Web Token Generator ---------------------------------------------------
import jsonwebtoken from 'jsonwebtoken'; // JSON Web Token

// Global Variables -----------------------------------------------------------
const { JWT_SECRET } = process.env; // Environment Variables

// JWT ISSUER
// Issue a JSON Web Authentication Token from User document
const jwtIssuer = (user) => {
  const { _id, email, full_name } = user; // Get User’s attributes.

  const options = {
    expiresIn: '7d', // Duration Web Token remains valid.
  };

  const payload = {
    // Fields to be included in Web Token.
    id: _id,
    email,
    full_name,
  };

  // Generate JSON Web Token
  const signedToken = jsonwebtoken.sign(payload, JWT_SECRET, options);

  // Return Generated Authorization Token.
  return {
    token: 'Bearer ' + signedToken,
    expiresIn: options.expiresIn,
  };
};

export default jwtIssuer;
