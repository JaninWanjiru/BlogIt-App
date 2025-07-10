import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const client = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, userName, email, password } = req.body;
    const hashedPass = await bcrypt.hash(password, 9);
    await client.user.create({
      data: { firstName, lastName, userName, email, password: hashedPass },
    });
    res.status(201).json({ message: "User created successfully" });
  } catch (e) {
    res.status(500).json({ message: "something went wrong" });
  }
};
