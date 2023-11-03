import express from "express";
import { Prisma, PrismaClient } from "@prisma/client";

export const create_comment = async (
  req: express.Request,
  res: express.Response
) => {
  res.send("something");
};

export const delete_comment = async (
  req: express.Request,
  res: express.Response
) => {
  res.send("something");
};

export const get_comments = async (
  req: express.Request,
  res: express.Response
) => {
  res.send("something");
};

export const get_comment = async (
  req: express.Request,
  res: express.Response
) => {
  res.send("something");
};
