import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { name, email, password, phoneNumber } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    console.log(err);
  }

  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User already exists! Please login :)" });
  }

  const hashPassword = bcrypt.hashSync(password);

  const user = new User({
    name,
    email,
    password: hashPassword,
    phoneNumber,
  });

  try {
    await user.save();
  } catch (error) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }

  return res.status(201).json({ message: user });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return new Error(error);
  }

  if (!existingUser) {
    return res
      .status(400)
      .json({ message: "User not found! Please signup :)" });
  }

  const isPasswordValid = bcrypt.compareSync(password, existingUser.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Email/Password is invalid :(" });
  }

  const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30s",
  });

  res.cookie(String(existingUser._id), token, {
    path: "/",
    expires: new Date(Date.now() + 1000 * 30),
    httpOnly: true,
    sameSite: "lax",
  });

  return res
    .status(200)
    .json({ message: "Successfully logged in :)", user: existingUser, token });
};

export const verifyToken = async (req, res, next) => {
  const cookies = req.headers.cookie;
  // console.log(cookies);
  const token = cookies.split("=")[1];
  console.log(token);
  // const headers = req.headers[`authorization`];
  // const token = headers.split(" ")[1];

  if (!token) {
    return res.status(404).json({ message: "No token found :(" });
  }

  jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Invalid token :(" });
    }

    console.log(user.id);
    req.id = user.id;
  });

  next();
};

export const getUser = async (req, res, next) => {
  const userId = req.id;
  let user;

  try {
    user = await User.findById(userId, "-password");
  } catch (error) {
    return new Error(error);
  }

  if (!user) {
    return res.status(404).json({ message: "User not found :(" });
  }

  return res.status(200).json({ message: user });
};

export const refreshToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies.split("=")[1];
  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }
  jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Authentication failed" });
    }
    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`] = "";

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "35s",
    });
    console.log("Regenerated Token\n", token);

    res.cookie(String(user.id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 30), // 30 seconds
      httpOnly: true,
      sameSite: "lax",
    });

    req.id = user.id;
    next();
  });
};


export const logout = (req, res, next) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies.split("=")[1];
  // console.log(prevToken);
  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }
  jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Authentication failed" });
    }
    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`] = "";
    return res.status(200).json({ message: "Successfully Logged Out" });
  });
};
