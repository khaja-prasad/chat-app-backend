const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  getConversationId,
  setConversationId,
} = require("../controllers/ConversationControllers");
const {
  getMessages,
  sendMessage,
  setFile,
  setImage,
} = require("../controllers/MessageControllers");
const { setProfilePicture } = require("../controllers/AuthControllers");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const fn =
      file.originalname.split(".")[0] +
      "-" +
      Date.now() +
      path.extname(file.originalname);
    cb(null, fn);
  },
});

const upload = multer({ storage: storage });

const routes = express.Router();

routes.post("/getconversationid", getConversationId);
routes.post("/setconversationid", setConversationId);

routes.post("/getmessages", getMessages);

routes.post("/sendmessage", sendMessage);

routes.post("/uploadimage", upload.single("image"), setImage);

routes.post("/uploadfile", upload.single("file"), setFile);

routes.post(
  "/profilephotoupload",
  upload.single("profile_photo"),
  setProfilePicture
);

routes.get("/download/:filename/:originalname", (req, res) => {
  const { filename, originalname } = req.params;
  console.log(filename, originalname);
  res.setHeader("Content-disposition", `attatchment;filename:${originalname}`);
  res.download(`./uploads/${filename}`, originalname, (err) => {
    if (err) res.status(404).send(err);
  });
});

module.exports = routes;
