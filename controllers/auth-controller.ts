import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

type Tdatabase = {
  username: string;
  password: string;
};

const database: Tdatabase[] = [];

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { username, password } = req.body;

    const findUser = database.findIndex((users) => users.username === username);

    if (findUser === -1) {
      const hashedPassword = await bcrypt.hash(password, 12);

      database.push({
        username,
        password: hashedPassword,
      });

      return res.json({ message: "User succesfully created" }).status(200);
    }

    return res.json({ message: "User already exists" }).status(400);
  } catch (e: unknown) {
    if (typeof e === "string") {
      return res.json({ message: e }).status(500);
    }

    return res.json(e);
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { username, password } = req.body;

    const findUser = database.findIndex((users) => users.username === username);

    if (findUser === -1) {
      return res.json({ message: "User doesn't exist" }).status(400);
    }

    const checkpassword = await bcrypt.compare(
      password,
      database[findUser].password
    );

    if (!checkpassword) {
      return res.json({ message: "Invalid credentials" }).status(400);
    }

    const token_data = {
      username,
    };

    const token = jwt.sign(token_data, process.env.TOKEN_SECRET || "", {
      expiresIn: "15m",
    });

    return res
      .cookie("token", token, { httpOnly: true })
      .status(200)
      .json({ message: "User succesfully created" });
  } catch (e: unknown) {
    if (typeof e === "string") {
      return res.json({ message: e }).status(500);
    }

    return res.json(e);
  }
};

export const users = async (req: express.Request, res: express.Response) => {
  try {
    return res.json({ users: database }).status(200);
  } catch (e: unknown) {
    if (typeof e === "string") {
      return res.json({ message: e }).status(500);
    }

    return res.json(e);
  }
};

export const forgotPassword = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { username, newpassword } = req.body;

    const findUser = database.findIndex((users) => users.username === username);

    if (findUser === -1) {
      return res.json({ message: "User doesn't exist" }).status(400);
    }

    const hashPassword = await bcrypt.hash(newpassword, 10);

    database[findUser].password = hashPassword;

    return res.json({ user: database[findUser] });
  } catch (e: unknown) {
    if (typeof e === "string") {
      return res.json({ message: e }).status(500);
    }

    return res.json(e);
  }
};
