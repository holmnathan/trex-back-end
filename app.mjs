// Trex API Server ------------------------------------------------------------
import express from 'express'; // Express.js Node.js Framework,
import ora from 'ora'; // CLI Spinner,
import chalk from 'chalk'; // CLI Color Output,
import routes from './routes/routes.mjs'; // App Routes,
import cors from 'cors';
import passportConfig from './config/passport.mjs'; // Passport Configuration

// Environment Variables ------------------------------------------------------
const SERVER_PORT = process.env.SERVER_PORT || 8000;

// App Initialization
// ----------------------------------------------------------------------------
const app = express();
app.set('title', 'Trex API Server');

// Middleware
// ----------------------------------------------------------------------------
app.use(express.json()); // JSON parsing
app.use(express.urlencoded({ extended: false }));
app.use(cors()); // allow all CORS requests
passportConfig(app); // Passport Callback Function
app.use((request, response, next) => {
  // URL of App
  request.where = () => {
    return `${request.method} ${request.originalUrl}`;
  };
  return next();
});

// Routes ---------------------------------------------------------------------
app.get('/', (request, response) => {
  response.redirect('/api');
});

app.use('/api/', routes);

// Server ---------------------------------------------------------------------
const server = app.listen(SERVER_PORT, () => {
  const OraOptions = {
    // Ora CLI Spinner options
    text: chalk`{blue Trex API Server:} Connecting`,
    color: 'blue',
  };
  const spinner = ora(OraOptions).start();
  setTimeout(() => {
    spinner.succeed(
      chalk`{blue Trex API Server:} Connected on port (${SERVER_PORT})`
    ); // Success Message
  }, 1000);
});

export default server;
