import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();
async function CheckReusedEmailAndUsername(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, userName } = req.body;
  const usedEmail = await client.user.findFirst({ where: { email } });
  if (usedEmail) {
    res.status(400).json({ message: "Email already in use" });
    return;
  }
  const usedUsername = await client.user.findFirst({ where: { userName } });
  if (usedUsername) {
    res.status(400).json({ message: "Username already in use" });
    return;
  }
  next();
}

export default CheckReusedEmailAndUsername;
