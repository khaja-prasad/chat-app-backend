const User = require("../models/User.js");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const availableUser = await User.findOne({ email: email });

    if (!availableUser)
      return res.status(401).json({
        message:
          "There is no account registered with this Email, Please register to Login!",
      });

    if (availableUser.password === password) {
      const loggedUser = await User.findOne(
        { email: email },
        { _id: 1, email: 1, name: 1, profile_photo_url: 1 }
      );
      return res.status(201).json(loggedUser);
    } else
      return res.status(401).send({
        message: "Wrong Password, Please Enter the correct password to Login!",
      });
  } catch (error) {
    return res.status(401).send({ message: error.message });
  }
};

exports.signUp = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (await User.findOne({ email: email }))
      return res.status(401).json({
        message:
          "Email already exists, Try to login or use another Email to register.",
      });
    const user = await User.create({ email, password, name });

    return res.status(201).send(user);
  } catch (error) {
    return res.status(401).send({ message: error.message });
  }
};

exports.forgotpasswordUser = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user)
      return res.status(401).json({
        message: `User with email: ${email} doesn't exist. Please check email or Register.`,
      });
    console.log("first");
    return res.status(201).send(user);
  } catch (error) {
    return res.status(401).send({ message: error.message });
  }
};

exports.newPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { email: email },
      { password: password }
    );

    if (!user)
      return res.status(401).error({
        message:
          "Unable to find the user with the given Email. Please RELOAD the App.",
      });

    return res
      .status(201)
      .send({ message: "Password updated Successfully! Please Login!" });
  } catch (error) {
    return res.status(401).send({ message: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find(
      {},
      { _id: 1, name: 1, profile_photo_url: 1 }
    );
    return res.status(201).json(users);
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};
