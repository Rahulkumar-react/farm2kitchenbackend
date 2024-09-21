const express = require("express");
const cors = require("cors");
const { connectDB } = require("./src/confic/db");
const createTables = require("./src/confic/createTables");
const bodyParser = require("body-parser");
const routes = require("./src/routes");
const app = express();
var session = require('express-session');

connectDB();
createTables();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));
// Test route to fetch data from a table (e.g., 'users' table)
app.use("/api", routes);
// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
