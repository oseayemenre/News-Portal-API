import express from "express";
import bcrypt, { hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.admins.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 12);

      await prisma.admins.create({
        data: {
          username,
          password: hashedPassword,
        },
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

    const user = await prisma.admins.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      return res.json({ message: "User doesn't exist" }).status(400);
    }

    const checkpassword = await bcrypt.compare(password, user.password);

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
      .json({ message: "User succesfully logged in" });
  } catch (e: unknown) {
    if (typeof e === "string") {
      return res.json({ message: e }).status(500);
    }

    return res.json(e);
  }
};

export const users = async (req: express.Request, res: express.Response) => {
  try {
    const users = await prisma.admins.findMany();

    return res.send(users).status(200);
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
    const { username, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    await prisma.admins.update({
      where: {
        username,
      },

      data: {
        password: hashPassword,
      },
    });

    return res.json({ message: "Password Succesfully updated" }).status(200);
  } catch (e: unknown) {
    if (typeof e === "string") {
      return res.json({ message: e }).status(500);
    }

    return res.json(e);
  }
};
