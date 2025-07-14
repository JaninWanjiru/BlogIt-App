import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

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
    res.status(500).json({ message: "There was a hiccup on our end. Please try again." });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    // get the identifier and password sent by user from req.body
    const { identifier, password} = req.body; 

    // look for a user in the db using the provided identifier
    const user = await client.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { userName: identifier }
        ]
      }
    });

    // if no user is found, return an error saying the details are incorrect
    if (!user) {
      res.status(401).json({ message: "Login details not correct" });
      return;
    }

    // check if the entered password matches the one saved in the database
    const validPassword = await bcrypt.compare(password, user.password);

    // if the passwords don't match, stop the process and show an error
    if (!validPassword) {
      res.status(401).json({ message: "Login details not correct" });
      return ;
    }

    // remove sensitive info
    const {password: userPassword, createdAt, updatedAt, ...userDetails} = user

    // create a token for the logged-in user
    const token = jwt.sign(userDetails, process.env.JWT_SECRET!)
    
    // send the token back to the user as a cookie after a successful login
    res.cookie("authToken", token).json(userDetails)
  } catch (e) {
    res.status(500).json({ message: "There was a hiccup on our end. Please try again." });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, userName, email } = req.body;
    const { id } = req.user;
    
    await client.user.update({
      where: { id },
      data: { firstName, lastName, userName, email },
    });
    
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (e) {
    res.status(500).json({ message: "There was a hiccup on our end. Please try again." });
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const { current, new: newPassword } = req.body;
    const { id } = req.user;
    
    const user = await client.user.findUnique({ where: { id } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    
    const validPassword = await bcrypt.compare(current, user.password);
    if (!validPassword) {
      res.status(401).json({ message: "Current password is incorrect" });
      return;
    }
    
    const hashedNewPassword = await bcrypt.hash(newPassword, 9);
    await client.user.update({
      where: { id },
      data: { password: hashedNewPassword },
    });
    
    res.status(200).json({ message: "Password updated successfully" });
  } catch (e) {
    res.status(500).json({ message: "There was a hiccup on our end. Please try again." });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "Logged out successfully" });
  } catch (e) {
    res.status(500).json({ message: "There was a hiccup on our end. Please try again." });
  }
}