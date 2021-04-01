import user from "./user.mjs";
import database from "../models/index.mjs";

const index = ( request, response ) => {
  response.json({ name: "Trex API Server", author: "Nathan Holm" });
}

export default {
  index,
  user
}