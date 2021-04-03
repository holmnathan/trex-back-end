import jsonwebtoken from 'jsonwebtoken'; // JSON Web Token
const { JWT_SECRET } = process.env; // Environment Variables

const issueJWT = (user) => {
  const { _id, email, full_name } = user; // Get User’s attributes

  const options = {
    expiresIn: '7d', // Duration Web Token remains valid
  };

  const payload = {
    // Fields to be included in Web Token
    id: _id,
    email,
    full_name,
  };

  // Generate JSON Web Token
  const signedToken = jsonwebtoken.sign(payload, JWT_SECRET, options);

  return {
    token: 'Bearer ' + signedToken,
    expiresIn: options.expiresIn,
  };
};

export default issueJWT;
