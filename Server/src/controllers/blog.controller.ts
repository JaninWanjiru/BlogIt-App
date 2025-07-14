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
      where: { isDeleted: false },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            userName: true,
            profilePic: true,
          },
        },
      },
    });
    res.status(200).json(blogs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was a hiccup on our end. Please try again." });
  }
};

// functionality for getting user's blogs
export const getUserBlogs = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const blogs = await client.blog.findMany({
      where: { 
        userId: id,
        isDeleted: false 
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            userName: true,
            profilePic: true,
          },
        },
      },
    });
    res.status(200).json(blogs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was a hiccup on our end. Please try again." });
  }
};

// functionality for getting specific blog
export const getBlog = async (req: Request, res: Response) => {
  try {
    const { blogId } = req.params;
    const {id} = req.user
    const blog = await client.blog.findFirst({
      where: {
        AND: [{ id: blogId }, { userId: id }, { isDeleted: false }]
      }
    });
    if (!blog) {
      res.status(404).json({message: "Blog not found"});
      return;
    }
    res.status(200).json(blog)
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was a hiccup on our end. Please try again." });
  }
};

// functionality for updating blog
export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { blogId } = req.params;
    const { title, synopsis, content, featuredImage } = req.body;
    const updatedBlog = await client.blog.update({
      where: { id: blogId },
      data: { title, synopsis, content, featuredImage },
    });
    res.status(200).json(updatedBlog);
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was a hiccup on our end. Please try again." });
  }
};

// functionality for deleting blog
export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { blogId } = req.params;
    await client.blog.update({
      where: { id: blogId },
      data: { isDeleted: true },
    });
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was a hiccup on our end. Please try again." });
  }
};

