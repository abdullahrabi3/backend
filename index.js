import express from "express";
import bootstrap from "./src/app.conroller.js";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join("./src/config/.env") });

const app = express();
const port = process.env.PORT || 5000;

await bootstrap(app, express);

app.listen(
  process.env.PORT || 5000,
  () => console.log(`Example app listening on port ${process.env.PORT}!`),

  console.log(port)
);
