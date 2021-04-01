import express from "express";
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
const server = app.listen(SERVER_PORT, () => {
  console.log("------------------------------------------------------------")
  console.log(chalk`{blue ${app.get("title")}}`)
  console.log(`Running on port ${SERVER_PORT}`)
  console.log("------------------------------------------------------------")
});

export default server;