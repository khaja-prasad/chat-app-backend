const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const port = process.env.PORT || 9999;

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then((req, res) => console.log("database connected ..."))
  .catch((err) => console.log(err.message));

app.use(require("./routes/Authentication"));
app.use(require("./routes/Conversation"));

app.listen(port, () => {
  console.log(`server running at ${port}`);
});
