const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Import routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

// Setup env variables
dotenv.config();

// connect to db
mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true }, () =>
  console.log("Connected to mongodb")
);

app.use(express.json());


app.use("/api/users", authRoute);
app.use("/api/posts", postRoute);

app.listen(3000, () => console.log("Server is running on 3000"));
