import express from "express";
import ora from "ora";
import chalk from "chalk";
import routes from "./routes/index.mjs";

// Environment Variables
//-----------------------------------------------------------------------------
const SERVER_PORT = ( process.env.SERVER_PORT || 8000 );

// App Initialization
//-----------------------------------------------------------------------------
const app = express();
app.set("title", "Trex API Server");

// Middleware
//-----------------------------------------------------------------------------
app.use(express.json()); // JSON parsing

// Routes
//-----------------------------------------------------------------------------
app.get("/", ( request, response ) => {
  response.redirect("/api")
});

app.use("/api/", routes);

// Server
//-----------------------------------------------------------------------------
// Ora CLI Spinner options
const OraOptions = {
  text: chalk`{blue Trex API Server:} Connecting`,
  color: "blue"
}

const spinner = ora(OraOptions).start(); // Start spinner
const server = app.listen(SERVER_PORT, () => {
  setTimeout(() => {
    spinner.succeed(chalk`{blue Trex API Server:} Connected on port (${SERVER_PORT})`) // Success Message
  }, 2000);
});

export default server;