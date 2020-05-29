const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
require("dotenv").config();



// For heroku Deployment
var MONGODB_URI = process.env.MONGODB_URI || process.env.REMOTE;
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//local connection
// mongoose.connect("mongodb://localhost/budget", {
//   useNewUrlParser: true,
//   useFindAndModify: false,
//   useUnifiedTopology: true
// });

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});