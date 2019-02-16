const express = require("express");
const app = express();

console.log("The server is running");
const PORT = process.env.PORT || 5000;
app.listen(PORT);
