const express = require("express");

const app = express();

const PORT = 8000;

function handleListening() {
  console.log(`Listening on: http://localhost: ${PORT}`);
}

app.listen(PORT, handleListening);
