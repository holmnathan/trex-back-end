import express from "express";
import chalk from "chalk";

// Environment Variables
const SERVER_PORT = process.env.SERVER_PORT || 8000

const app = express();

app.listen(SERVER_PORT || 8000, () => {
  console.log("------------------------------------------------------------")
  console.log(chalk`{blue Trex Back End}\nRunning on port ${SERVER_PORT || 8000}`)
  console.log("------------------------------------------------------------")
});