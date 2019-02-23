import "@babel/polyfill";
import "./db";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

import "./models/User";
import "./models/Video";
import "./models/Comment";

const PORT = process.env.PORT || 8080;

const handleListening = () =>
  console.log(`Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
