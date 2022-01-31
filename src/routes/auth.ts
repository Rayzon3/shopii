import { validate, isEmpty } from "class-validator";
import { Request, Response, Router } from "express";
import bcrpyt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";

import User from "../entities/User";
import auth from "../middleware/auth";

const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    //find duplicate user
    let errors: any = {};
    const emailUser = await User.findOne({ email });
    const usernameUser = await User.findOne({ username });

    if (emailUser) errors.email = "This email is already taken!";
    if (usernameUser) errors.username = "This username is already taken!";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    //create user
    const user = new User({ username, email, password });

    //validate user
    errors = await validate(user);
    if (errors.length > 0) {
      let mappedErrors: any = {};
      errors.forEach((e: any) => {
        const key = e.property;
        const value = Object.entries(e.constraints)[0][1];
        mappedErrors[key] = value;
      });
      return res.status(400).json(mappedErrors);
    }

    //save user
    await user.save();
    return res.json(user);
    //return user
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    let errors: any = {};
    if (isEmpty(username)) errors.username = "Username must not be empty!";
    if (isEmpty(password)) errors.password = "Password must not be empty!";
    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(404)
        .json({ username: "Wrong username or password :/" });
    const passwordMatches = await bcrpyt.compare(password, user.password);
    if (!passwordMatches)
      return res
        .status(401)
        .json({ password: "Wrong username or password :/" });

    const token = jwt.sign({ username }, process.env.JWT_SECRET);

    res.set(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600,
        path: "/",
      })
    );

    return res.json({ user: user, token: token });
  } catch (e) {
    console.log(e);
  }
};

const logout = async (req: Request, res: Response) => {
  res.set(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0),
      path: "/",
    })
  );

  return res.status(200).json({ logout: "true" });
};

const me = (req: Request, res: Response) => {
  return res.json(res.locals.user);
};

const router = Router();
router.post("/register", register);
router.post("/login", login);
router.get("/logout", auth, logout);
router.get("/me", auth, me);

export default router;
