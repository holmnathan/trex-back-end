import database from "../models/index.mjs";

const index = ( request, response ) => {
  response.json("User");
}

const login = ( request, response ) => {
  console.log("POST: /login");
  console.log(request.body)
}

export default {
  index,
  login
}