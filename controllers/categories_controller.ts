import express from "express";

type Tcategory = {
  no: number;
  category: string;
  description: string;
  postingDate: Date;
  updationDate: Date;
};

const category: Tcategory[] = [];
let count = 0;

const date = new Date();

export const create_category = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { title, description } = req.body;

    const index = category.findIndex(
      (categories: Record<string, string | number | Date>) =>
        categories.category === title
    );

    if (index === -1) {
      category.push({
        no: (count += 1),
        category: title,
        description,
        postingDate: date,
        updationDate: date,
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

    const index = category.findIndex(
      (categories) => categories.category === id
    );

    if (index === -1) {
      return res.json({ message: "Category does't exist" }).status(400);
    }

    category.splice(index, 1);

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
    const { title, description } = req.body;

    const index = category.findIndex(
      (categories: Record<string, string | number | Date>) =>
        categories.category === title
    );

    if (index === -1) {
      return res.json({ message: "Category doesn't exist" }).status(400);
    }

    category[index].description = description;

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
    return res.json({ categories: category }).status(200);
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

    const index = category.findIndex(
      (categories) => categories.category === id
    );

    if (index === -1) {
      return res.json({ message: "Category does't exist" }).status(400);
    }

    return res.json({ category: category[index] });
  } catch (e: unknown) {
    if (typeof e === "string") {
      return res.json({ message: e }).status(500);
    }

    return res.json(e);
  }
};
