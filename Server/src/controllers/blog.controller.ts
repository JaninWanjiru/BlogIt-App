import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const client = new PrismaClient();

export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, synopsis, content, featuredImage } = req.body;
    const { id } = req.user;
    const newBlog = await client.blog.create({
      data: { title, synopsis, content, featuredImage, userId: id },
    });
    res.status(201).json(newBlog);
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was a hiccup on our end. Please try again." });
  }
};
