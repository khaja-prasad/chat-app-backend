const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const path = require("path");

const port = process.env.PORT || 9999;
// console.log(../chat-app-backend/uploads);
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "uploads")));

mongoose
  .connect(process.env.MONGO_URI)
  .then((req, res) => console.log("database connected ..."))
  .catch((err) => console.log(err.message));

app.use(require("./routes/Authentication"));
app.use(require("./routes/Conversation"));

app.listen(port, () => {
  console.log(`server running at ${port}`);
});
