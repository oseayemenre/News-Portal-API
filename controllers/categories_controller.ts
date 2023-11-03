import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const create_category = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { title, description } = req.body;

    const category = prisma.category.findUnique({
      where: {
        categoryName: title,
      },
    });

    if (!category) {
      await prisma.category.create({
        data: {
          categoryName: title,
          description,
        },
      });
      return res.json({ message: "Category added succesfully" }).status(200);
    }

    return res.json({ message: "Category already exists" }).status(400);
  } catch (e: unknown) {
    if (typeof e === "string") {
      return res.json({ message: e }).status(500);
    }

    return res.json(e);
  }
};

export const delete_category = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      return res.json({ message: "Category does't exist" }).status(400);
    }

    await prisma.category.delete({
      where: {
        id,
      },
    });

    return res.json({ message: "Sucessfully deleted" }).status(200);
  } catch (e: unknown) {
    if (typeof e === "string") {
      return res.json({ message: e }).status(500);
    }

    return res.json(e);
  }
};

export const update_category = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      return res.json({ message: "Category doesn't exist" }).status(400);
    }

    await prisma.category.update({
      where: {
        categoryName: category.categoryName,
        description: category.description,
      },

      data: {
        categoryName: title,
        description: description,
      },
    });

    return res.json({ message: "Category updated succesfully" }).status(200);
  } catch (e: unknown) {
    if (typeof e === "string") {
      return res.json({ message: e }).status(500);
    }

    return res.json(e);
  }
};

export const get_categories = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    return res.send(await prisma.category.findMany()).status(200);
  } catch (e: unknown) {
    if (typeof e === "string") {
      return res.json({ message: e }).status(500);
    }

    return res.json(e);
  }
};

export const get_category = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      return res.json({ message: "Category doesn't exist" }).status(400);
    }

    return res.send(category).status(200);
  } catch (e: unknown) {
    if (typeof e === "string") {
      return res.json({ message: e }).status(500);
    }

    return res.json(e);
  }
};
