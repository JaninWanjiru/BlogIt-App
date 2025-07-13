import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const client = new PrismaClient();

export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, synopsis, content, featuredImage } = req.body;
    const { id } = req.user;
    await client.blog.create({
      data: { title, synopsis, content, featuredImage, userId: id },
    });
    res.status(201).json({ msg: "Blog created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was a hiccup on our end. Please try again." });
  }
};

// functionality for getting all blogs
export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    // const {id} = req.user;
    const blogs = await client.blog.findMany({
      where: {isDeleted: false},
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            userName: true,
            profilePic: true
          }
        }
      },
    })
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "There was a hiccup on our end. Please try again." });
  }
}; 